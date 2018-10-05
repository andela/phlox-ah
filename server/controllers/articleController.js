import slug from 'slug';
import uuid from 'uuid-random';
import Model from '../models';

const { Article } = Model;
/**
 * @param  {} req
 * @param  {} res
 * @param  {} {const{title
 * @param  {} body
 * @param  {} description
 * @param  {} body
 * @param  {} description
 * @param  {} slug
 */
export default class ArticleController {
  /**
   * @param  {} req
   * @param  {} res
   */
  static create(req, res) {
    const {
      title, body, description
    } = req.body;
    Article.create({
      title, body, userId: req.user.id, description, slug: `${slug(title)}-${uuid()}`, imgUrl: req.file.secure_url
    }).then(article => res.status(201).json({ article }))
      .catch(error => res.status(500).json(error));
  }

  /**
   * @param  {} req
   * @param  {} res
   */
  static getAllArticles(req, res) {
    Article.findAll({
      limit: 10
    }).then(articles => res.status(200).json({ articles }))
      .catch(error => res.status(500).json(error));
  }

  /**
   * @param  {} req
   * @param  {} res
   */
  static getUserArticles(req, res) {
    Article.findAll({
      where: {
        userId: req.user.id
      },
      limit: 10
    }).then(articles => res.status(200).json({ articles }))
      .catch(error => res.status(500).json(error));
  }

  /**
   * @param  {} req
   * @param  {} res
   */
  static getSingle(req, res) {
    Article.findOne({
      where: {
        slug: req.params.slug
      }
    }).then(article => res.status(200).json({ article }))
      .catch(error => res.status(500).json(error));
  }

  /**
   * @param  {} req
   * @param  {} res
   */
  static update(req, res) {
    Article.update(req.body, {
      where: {
        slug: req.params.slug,
        userId: req.user.id
      }
    }).then(article => res.status(200).json({ article }))
      .catch(error => res.status(500).json(error));
  }

  /**
   * @param  {} req
   * @param  {} res
   */
  static remove(req, res) {
    Article.destroy(req.body, {
      where: {
        slug: req.params.slug,
        userId: req.user.id
      }
    }).then(article => res.status(204))
      .catch(error => res.status(500).json(error));
  }
}
