import slug from 'slug';
import uuid from 'uuid-random';
import Model from '../models';

const {
  Article, ArticleComment, User
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
    const imgUrl = (req.file ? req.file.secure_url : '');
    Article.create({
      title, body, userId: req.user.id, description, slug: `${slug(title)}-${uuid()}`, imgUrl
    }).then(article => res.status(201).json({ message: 'article created successfully', status: 'success', article }))
      .catch(error => res.status(500).json(error));
  }

  /**
  * @description -This method gets all articles
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and list of articles
  */
  static getAllArticles(req, res) {
    Article.findAll({ limit: 10 })
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
      limit: 10
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
      include: [{
        model: ArticleComment,
        include: [{
          model: User, attributes: ['username', 'email'],
        }],
      }]
    }).then((article) => {
      if (article === null) {
        res.status(404).json({ message: 'article does not exist', status: 'failed' });
      } else {
        res.status(200).json({ message: 'article retrieved successfully', status: 'success', article });
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
    Article.update(req.body, {
      where: { slug: req.params.slug, userId: req.user.id },
      returning: true,
    }).then((article) => {
      if (article[0] === 0) {
        res.status(404).json({ message: 'article does not exist', status: 'failed' });
      } else {
        res.status(200).json({ message: 'article updated successfully', status: 'success', article });
      }
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
    Article.destroy({
      where: { slug: req.params.slug, userId: req.user.id }
    }).then((article) => {
      if (article === 0) {
        res.status(404).json({ message: 'article does not exist', status: 'failed' });
      } else {
        res.status(204).end();
      }
    })
      .catch(error => res.status(500).json(error));
  }
}
