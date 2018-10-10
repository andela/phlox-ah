import Model from '../models';
import computeRateAverage from '../helpers/rate/computeAverage';

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
    Article.findOne({
      where: { slug: req.params.slug }
    }).then((article) => {
      if (article) {
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
              // eslint-disable-next-line
            } else {
              return Rate.create({
                userId: req.user.id,
                articleId: article.dataValues.id,
                rating: req.body.rating
              });
            }
          })
          .then(() => {
            computeRateAverage(
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
  }
}

export default RateController;
