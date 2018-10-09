import Sequelize from 'sequelize';
import Model from '../../models';

const { Article, Rate } = Model;

const computeRateAverage = (articleId, articleSlug, res) => {
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
};

export default computeRateAverage;
