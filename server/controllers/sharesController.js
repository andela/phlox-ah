import env from 'dotenv';
import Model from '../models';

/* eslint-disable object-curly-newline */
const { Shares } = Model;


env.config();
/**
  * @class SharesController
  * @description Handles shares operation
  */
class SharesController {
  /**
     * @description - This method fetches all shares for an article
     * @param {List} req - Request Payload
     * @param {String} res - Response payload
     * @returns {object} res
     */
  static getArticleShares(req, res) {
    Shares
      .findAll({ where: { articleSlug: req.params.articleSlug } })
      .then((shares) => {
        const sharesCount = shares.length;
        res.status(200).json({ success: true, shares, sharesCount });
      })
      .catch(error => res.status(500).json({ success: false, error }));
  }

  /**
     * @description - This records a shaeed article to database
     * @param {List} req - Request Payload
     * @param {String} res - Response payload
   * @returns {object} res
   */
  static shareArticle(req, res) {
    Shares
      .create({ userId: req.user.id, articleSlug: req.params.articleSlug })
      .then((article) => {
        res.status(201).json({ success: true, message: 'successfully shared an article', article });
      })
      .catch(error => res.status(500).json({ success: false, error }));
  }
}

export default SharesController;
