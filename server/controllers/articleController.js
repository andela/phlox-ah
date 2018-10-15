import slug from 'slug';
import uuid from 'uuid-random';
import Model from '../models';
import getTagIds from '../helpers/tags/getTagIds';
import readingTime from '../helpers/readTime';

const {
  Article, Tag, Like, ArticleComment, User
} = Model;

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
    const { title, body, description } = req.body;
    const readTime = readingTime(body); // calculate the time it will take to read the article
    const imgUrl = (req.file ? req.file.secure_url : '');
    // this function gets the tag ids of the tags sent in the request
    getTagIds(req, res).then((tagIds) => {
      Article.create({
        title, body, userId: req.user.id, description, slug: `${slug(title)}-${uuid()}`, imgUrl, readTime
      }).then((article) => {
        article.setTags(tagIds).then(() => {
          article.getTags({ attributes: ['id', 'name'] }).then((associatedTags) => {
            res.status(201).json({
              message: 'article created successfully', success: true, article, tags: associatedTags
            });
          });
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
    Article.findAll({
      limit: 10,
      include: [
        { model: Tag, as: 'Tags', through: 'ArticlesTags' },
        { model: Like, as: 'likes' }
      ]
    })
      .then(articles => res.status(200).json({ message: 'articles retrieved successfully', success: true, articles }))
      .catch(error => res.status(500).json(error));
  }

  /**
  * @description -This method gets all articles  of the authenticated user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and list of user's articles
  */
  static getUserArticles(req, res) {
    Article.findAll({
      where: { userId: req.user.id },
      limit: 10,
      include: [
        { model: Tag, as: 'Tags', through: 'ArticlesTags' },
        { model: Like, as: 'likes' }
      ]
    }).then(articles => res.status(200).json({ message: 'articles retrieved successfully', success: true, articles }))
      .catch(error => res.status(500).json(error));
  }

  /**
  * @description -This method gets an article by the slug
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and list of articles
  */
  static getSingleArticle(req, res) {
    Article.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: ArticleComment,
          include: [
            { model: User, attributes: ['username', 'email'], }
          ],
        },
        { model: Tag, as: 'Tags', through: 'ArticlesTags' },
        { model: Like, as: 'likes' }
      ]
    }).then((article) => {
      if (!article) {
        res.status(404).json({ message: 'article does not exist', success: false });
      } else {
        res.status(200).json({ message: 'article retrieved successfully', success: true, article });
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

    req.body.imgUrl = imgUrl;
    req.body.readTime = readTime;
    // this function gets the tag ids of the tags sent in the request
    getTagIds(req, res).then((tagIds) => {
      Article.findOne({
        where: { slug: req.params.slug, userId: req.user.id },
      }).then((article) => {
        if (!article) {
          res.status(404).json({ message: 'article does not exist', success: false });
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
}
