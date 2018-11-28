import slug from 'slug';
import uuid from 'uuid-random';
import jwt from 'jsonwebtoken';
import Model from '../models';
import getTagIds from '../helpers/tags/getTagIds';
import readingTime from '../helpers/readTime';
import { computeOffset, computeTotalPages } from '../helpers/article';
import Notification from './notificationController';

const {
  Article, Tag, Like, ArticleComment, User, Stats, Category, Highlight, Profile
} = Model;

const LIMIT = 15;

/**
  * @class ArticleController
  * @description CRUD operations on Article
  */
export default class ArticleController {
  /**
  * @description -This method creates article for an authenticated user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and article detail
  */
  static createArticle(req, res) {
    const {
      title, body, description, categoryId
    } = req.body;
    const readTime = readingTime(body); // calculate the time it will take to read the article
    const imgUrl = (req.file ? req.file.secure_url : '');
    const articleSlug = `${slug(title)}-${uuid()}`;
    // this function gets the tag ids of the tags sent in the request
    getTagIds(req, res).then((tagIds) => {
      Article.create({
        title,
        body,
        userId: req.user.id,
        description,
        slug: articleSlug,
        imgUrl,
        readTime,
        categoryId
      }).then((article) => {
        article.setTags(tagIds).then(() => {
          article.getTags({ attributes: ['id', 'name'] }).then((associatedTags) => {
            res.status(201).json({
              message: 'article created successfully', success: true, article, tags: associatedTags
            });
          });
        })
          .then(() => {
            Notification.notifyForArticle(req.user.id, articleSlug, title, req.user.username);
          })
          .catch(() => res.status(404).json({ message: 'the tag does not exist', success: false }));
      })
        .catch(error => res.status(500).json(error));
    })
      .catch(error => res.status(500).json(error));
  }


  /**
  * @description -This method gets all articles
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and list of articles
  */
  static getAllArticles(req, res) {
    const page = computeOffset(req);
    Article.findAll()
      .then(data => Article.findAll({
        where: { status: 'published' },
        limit: LIMIT,
        offset: LIMIT * (page - 1),
        order: [
          ['createdAt', 'DESC'],
        ],
        include: [
          { model: Tag, as: 'Tags', through: 'ArticlesTags' },
          { model: Category },
          {
            model: User,
            include: [{
              model: Profile,
              attributes: ['profileImage']
            }],
            attributes: ['username']
          },
          {
            model: Like,
            as: 'likes',
            include: [{
              model: User,
              attributes: ['username', 'email']
            }]
          }
        ]
      })
        .then(articles => ({
          articles,
          pages: computeTotalPages(data, LIMIT)
        })))
      .then(data => res.status(200).json({
        message: 'articles retrieved successfully', success: true, articles: data.articles, pages: data.pages
      }))
      .catch(error => res.status(500).json(error));
  }

  /**
   * @description -This method gets all articles  of the authenticated user
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and list of user's articles
   */
  static getUserArticles(req, res) {
    const page = computeOffset(req);
    let query;
    if (req.params.status) {
      query = { status: req.params.status, userId: req.user.id };
    } else {
      query = { userId: req.user.id };
    }
    Article.findAll({ where: { userId: req.user.id } })
      .then(data => Article.findAll({
        where: query,
        limit: LIMIT,
        offset: LIMIT * (page - 1),
        order: [
          ['createdAt', 'DESC'],
        ],
        include: [
          { model: Category },
          { model: Tag, as: 'Tags', through: 'ArticlesTags' },
          {
            model: User,
            include: [{
              model: Profile,
              attributes: ['profileImage']
            }],
            attributes: ['username']
          },
          {
            model: Like,
            as: 'likes',
            include: [{
              model: User,
              attributes: ['username', 'email']
            }]
          }
        ]
      })
        .then(articles => ({
          articles,
          pages: computeTotalPages(data, LIMIT)
        })))
      .then(data => res.status(200).json({
        message: 'articles retrieved successfully', success: true, articles: data.articles, pages: data.pages
      }))
      .catch(error => res.status(500).json(error));
  }

  /**
   * @description -This method gets an article by the slug
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and list of articles
   */
  static getSingleArticle(req, res) {
    let query, userId;
    if (req.params.status) {
      query = { slug: req.params.slug, status: req.params.status, userId: req.user.id };
    } else {
      query = { slug: req.params.slug, status: 'published' };
    }
    if (req.user) {
      userId = req.user.id;
    } else {
      userId = null;
    }
    Article.findOne({
      where: query,
      include: [
        {
          model: ArticleComment,
          include: [
            { model: User, attributes: ['username', 'email'], }
          ],
        },
        {
          model: User,
          include: [{
            model: Profile,
            attributes: ['profileImage']
          }],
          attributes: ['username']
        },
        { model: Category },
        { model: Tag, as: 'Tags', through: 'ArticlesTags' },
        {
          model: Like,
          as: 'likes',
          include: [{
            model: User,
            attributes: ['username', 'email']
          }]
        },
        {
          model: Highlight,
          as: 'highlights',
          where: { userId },
          required: false
        }
      ]
    }).then((article) => {
      if (!article) {
        res.status(404).json({ message: 'article cannot be found', success: false });
      } else {
        const token = req.headers['x-access-token'] || req.headers.authorization;
        if (token) {
          jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
            userId = decoded.user.id;
          });
          Stats.findOrCreate({ where: { userId, articleId: article.id } })
            .spread((found, created) => {
              if (created) {
                return res.status(200).json({ message: 'article retrieved successfully', success: true, article });
              }
              return res.status(200).json({ message: 'article retrieved successfully', success: true, article });
            });
        } else {
          res.status(200).json({ message: 'article retrieved successfully', success: true, article });
        }
      }
    })
      .catch(error => res.status(500).json(error));
  }

  /**
   * @description -This method gets updates an article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and articles details
   */
  static updateArticle(req, res) {
    // calculate the time it will take to read the updated article
    const readTime = readingTime(req.body.body ? req.body.body : '');
    const imgUrl = (req.file ? req.file.secure_url : '');
    if (imgUrl) {
      req.body.imgUrl = imgUrl;
    }
    req.body.readTime = readTime;
    // this function gets the tag ids of the tags sent in the request
    getTagIds(req, res).then((tagIds) => {
      Article.findOne({
        where: { slug: req.params.slug, userId: req.user.id },
      }).then((article) => {
        if (!article) {
          res.status(404).json({ message: 'article cannot be found', success: false });
        } else {
          article.update(req.body)
            .then((updatedArticle) => {
              article.setTags(tagIds).then(() => {
                article.getTags({ attributes: ['id', 'name'] }).then((associatedTags) => {
                  res.status(200).json({
                    message: 'article updated successfully', success: true, article: updatedArticle, tags: associatedTags
                  });
                });
              })
                .catch(() => res.status(404).json({ message: 'the tag does not exist', success: false }));
            })
            .catch(error => res.status(500).json(error));
        }
      });
    })
      .catch(error => res.status(500).json(error));
  }

  /**
   * @description -This method deletes an article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and articles details
   */
  static deleteArticle(req, res) {
    Article.findOne({
      where: { slug: req.params.slug, userId: req.user.id },
    }).then((article) => {
      if (!article) {
        res.status(404).json({ message: 'article does not exist', success: false });
      } else {
        article.setTags([]).then(() => {
          article.destroy()
            .then(() => {
              res.status(204).end();
            })
            .catch(error => res.status(500).json(error));
        });
      }
    });
  }

  /**
   * @description -Method to set user preference
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - json data
   */
  static getArticleByPreference(req, res) {
    const page = computeOffset(req);
    User.find({
      where: { id: req.user.id }
    })
      .then((user) => {
        user.getCategories({
        })
          .then((categories) => {
            const categoryIds = categories.map(category => category.id);
            Article.findAll({
              where: {
                categoryId: categoryIds
              },
              limit: LIMIT,
              offset: LIMIT * (page - 1),
              order: [
                ['createdAt', 'DESC'],
              ],
              include: [
                { model: Tag, as: 'Tags', through: 'ArticlesTags' },
                { model: Category },
                {
                  model: Like,
                  as: 'likes',
                  include: [{
                    model: User,
                    attributes: ['username', 'email']
                  }]
                }
              ]
            })
              .then(articles => res.status(200).json({
                success: true,
                message: articles
              }));
          });
      });
  }

  /**
    * @description -This method deletes reported article by the admins
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - status and message
  */
  static deleteReportedArticle(req, res) {
    Article.findOne({
      where: { slug: req.params.slug },
    }).then((article) => {
      if (!article) {
        res.status(404).json({ message: 'article does not exist', success: false });
      } else {
        article.setTags([]).then(() => {
          article.destroy()
            .then(() => {
              res.status(204).end();
            })
            .catch(error => res.status(500).json(error));
        });
      }
    });
  }

  /**
    * @description -This method gets most popular(rated) arricles
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - status and message
  */
  static popularArticles(req, res) {
    Article.findAll({
      where: { status: 'published' },
      limit: 4,
      order: [
        ['ratingAverage', 'DESC'],
      ],
      include: [
        {
          model: User,
          include: [{
            model: Profile,
            attributes: ['profileImage']
          }],
          attributes: ['username']
        },
      ]
    }).then((articles) => {
      res.status(200).json({ message: 'articles retrieved successfully', success: true, articles });
    });
  }

  /**
    * @description -This method sets an article as featured by the admins
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - status and message
  */
  static setFeaturedArticle(req, res) {
    const { featured } = req.body;
    Article.findOne({
      where: { slug: req.params.slug },
    }).then((article) => {
      if (!article) {
        res.status(404).json({ message: 'article cannot be found', success: false });
      } else {
        article.update({ featured })
          .then((updatedArticle) => {
            res.status(200).json({
              message: 'article updated', success: true, article: updatedArticle
            });
          })
          .catch(error => res.status(500).json(error));
      }
    })
      .catch(error => res.status(500).json(error));
  }

  /**
    * @description -This method gets featured articles
    * @param {object} req - The request payload sent from the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - status and message
  */
  static featuredArticles(req, res) {
    Article.findAll({
      where: { status: 'published', featured: 1 },
      limit: 4,
      order: [
        ['createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          include: [{
            model: Profile,
            attributes: ['profileImage']
          }],
          attributes: ['username']
        },
      ]
    }).then((articles) => {
      res.status(200).json({ message: 'featured articles retrieved', success: true, articles });
    });
  }
}
