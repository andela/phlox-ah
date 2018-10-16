import { Op } from 'sequelize';
import Model from '../models';

const { Article, User } = Model;
/**
 * @class search
 */
export default class SearchController {
  /**
  * @description -This method searches for an article based
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and search result
  */
  static searchWith(req, res) {
    const {
      keyword, searchWith
    } = req.body;

    if (searchWith === 'author') {
      Article.findAll({
        attributes: ['id', 'title', 'body', 'slug', 'description', 'imgUrl', 'readTime', 'ratingAverage'],
        include: [{
          model: User,
          attributes: ['id', 'username'],
          where: { username: { [Op.iLike]: `%${keyword}%` } }
        }]
      })
        .then((searchResult) => {
          if (searchResult.length === 0) {
            return res.status(404).json({
              success: false,
              message: 'Nothing Found'
            });
          }
          return res.status(200).json({
            success: true,
            message: 'found result',
            searchResult
          });
        })
        .catch(err => res.status(500).json({ message: err }));
    } else if (searchWith === 'article') {
      Article.findAll({
        attributes: ['id', 'title', 'body', 'slug', 'description', 'imgUrl', 'readTime', 'ratingAverage'],
        where: { title: { [Op.iLike]: `%${keyword}%` } },
        include: [{
          model: User,
          attributes: ['id', 'username']
        }]
      })
        .then((searchResult) => {
          if (searchResult.length === 0) {
            return res.status(404).json({
              success: false,
              message: 'Nothing Found'
            });
          }
          return res.status(200).json({
            success: true,
            message: 'found result',
            searchResult
          });
        })
        .catch(err => res.status(500).json({ message: err }));
    }
  }
}
