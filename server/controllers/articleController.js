import slug from 'slug';
import uuid from 'uuid-random';
import Model from '../models';
import getTagIds from '../helpers/tags/getTagIds';

const { Article, Tag } = Model;
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
    const imgUrl = (req.file ? req.file.secure_url : '');
    getTagIds(req, res).then((tagIds) => {
      Article.create({
        title, body, userId: req.user.id, description, slug: `${slug(title)}-${uuid()}`, imgUrl
      }).then((article) => {
        article.setTags(tagIds).then(() => {
          article.getTags({ attributes: ['id', 'name'] }).then((associatedTags) => {
            res.status(201).json({
              message: 'article created successfully', status: 'success', article, tags: associatedTags
            });
          });
        })
          .catch(() => res.status(404).json({ message: 'the tag does not exist', status: 'failed' }));
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
        { model: Tag, as: 'Tags', through: 'ArticlesTags' }
      ]
    })
      .then(articles => res.status(200).json({ message: 'articles retrieved successfully', status: 'success', articles }))
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
        { model: Tag, as: 'Tags', through: 'ArticlesTags' }
      ]
    }).then(articles => res.status(200).json({ message: 'articles retrieved successfully', status: 'success', articles }))
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
        { model: Tag, as: 'Tags', through: 'ArticlesTags' }
      ]
    }).then((article) => {
      if (article === null) {
        res.status(404).json({ message: 'article does not exist', status: 'failed' });
      } else {
        res.status(200).json({
          message: 'article retrieved successfully', status: 'success', article,
        });
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
    const imgUrl = (req.file ? req.file.secure_url : '');
    req.body.imgUrl = imgUrl;
    getTagIds(req, res).then((tagIds) => {
      Article.findOne({
        where: { slug: req.params.slug, userId: req.user.id },
      }).then((article) => {
        if (article === null) {
          res.status(404).json({ message: 'article does not exist', status: 'failed' });
        } else {
          article.update(req.body)
            .then((updatedArticle) => {
              article.setTags(tagIds).then(() => {
                article.getTags({ attributes: ['id', 'name'] }).then((associatedTags) => {
                  res.status(200).json({
                    message: 'article updated successfully', status: 'success', article: updatedArticle, tags: associatedTags
                  });
                });
              })
                .catch(() => res.status(404).json({ message: 'the tag does not exist', status: 'failed' }));
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
      if (article === null) {
        res.status(404).json({ message: 'article does not exist', status: 'failed' });
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
