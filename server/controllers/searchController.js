import { Op } from 'sequelize';
import Model from '../models';

const {
  Article, User, Profile, Tag
} = Model;
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
    const { author, article, tag } = req.query;
    const usersIds = [];

    if (author) {
      Profile.findAll({
        attributes: ['id', 'firstName', 'lastName', 'userId'],
        where: {
          [Op.or]: [{
            firstName: { [Op.iLike]: `%${author}%` },
          }, {
            lastName: { [Op.iLike]: `%${author}%` }
          }]
        }
      })
        .then((users) => {
          users.map(user => usersIds.push(user.userId));
          if (!users) {
            return res.status(404).json({
              success: false,
              message: 'User not found'
            });
          }
          Article.findAll({
            attributes: ['id', 'title', 'body', 'slug', 'description', 'imgUrl', 'readTime', 'ratingAverage'],
            where: { userId: usersIds, status: 'published' },
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
        });
    } else if (article) {
      Article.findAll({
        attributes: ['id', 'title', 'body', 'slug', 'description', 'imgUrl', 'readTime', 'ratingAverage'],
        where: { title: { [Op.iLike]: `%${article}%` }, status: 'published' },
        include: [
          { model: Tag, as: 'Tags', through: 'ArticlesTags' },
          {
          model: User,
          attributes: ['id', 'username'],
          include: [{
            model: Profile,
            attributes: ['id', 'firstName', 'lastName'],
          }]
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
    } else if (tag) {
      Tag.findAll({
        attributes: ['id', 'name'],
        where: { name: { [Op.iLike]: `%${tag}%` } },
        include: [{
          model: Article,
          attributes: ['id', 'title', 'body', 'slug', 'description', 'imgUrl', 'readTime', 'ratingAverage'],
          where: { status: 'published' },
          as: 'Articles',
          through: 'ArticlesTags',
          include: [
            { model: Tag, as: 'Tags', through: 'ArticlesTags' },
            { model: User, attributes: ['username', 'email'], }
          ],
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
