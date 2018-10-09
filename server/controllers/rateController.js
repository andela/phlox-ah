import Sequelize from 'sequelize';
import Model from '../models';

const { Article, Rate } = Model;

/**
 *
 *
 * @class RateArticle
 */
class RateController {
/**
  * @description -This method rates an article
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and articles details
  */
  static rateArticle(req, res) {
    if (Number.isNaN(Number(req.body.rating)) !== true) {
      if (parseFloat(req.body.rating) >= 0 && parseFloat(req.body.rating) <= 5) {
        Article.findOne({
          where: { slug: req.params.slug }
        }).then((article) => {
          if (article !== null) {
            Rate.findOne({
              where: { articleId: article.dataValues.id, userId: req.user.id },
            })
              .then((rate) => {
                if (rate) {
                  return rate.update({
                    userId: req.user.id,
                    articleId: article.dataValues.id,
                    rating: req.body.rating
                  });
                }
                return Rate.create({
                  userId: req.user.id,
                  articleId: article.dataValues.id,
                  rating: req.body.rating
                });
              })
              .then(() => {
                RateController.computeRateAverage(
                  article.dataValues.id,
                  req.params.slug, res
                );
              })
              .catch(() => res.status(500).json({ success: false, error: 'Rate could not be updated' }));
          } else {
            res.status(404).json({ message: 'Article does not exist', status: 'failed' });
          }
        })
          .catch(error => res.status(500).json(error));
      } else {
        res.status(422).json({ message: 'Rating must be between 0 and 5', status: 'failed' });
      }
    } else {
      res.status(422).json({ message: 'Rating must be a valid number of float', status: 'failed' });
    }
  }

  /**
  * @description -This method computes the average rating of an article
  * @param {object} articleId - The id of the rated article
  * @param {object} articleSlug - The slug of the rated article
  * @param {object} res - The response to be returned by the method
  * @returns {object} - status, message and article details
  */
  static computeRateAverage(articleId, articleSlug, res) {
    Rate.findAll({
      attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'ratingAvg']],
      where: { articleId },
      order: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'DESC']]
    }).then((avg) => {
      Article.update({ ratingAverage: avg[0].dataValues.ratingAvg }, {
        where: { slug: articleSlug },
        returning: true,
      }).then((article) => {
        res.status(200).json({ message: 'Article has been rated', status: 'success', article });
      });
    });
  }
}

export default RateController;
