import Model from '../models';

const {
  Category, Article, Tag, Like, User
} = Model;

/**
  * @class CategoryController
  * @description CRUD operations on Category
  */
export default class CategoryController {
  /**
  * @description -This method gets all categories
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and categories
  */
  static getAllCategories(req, res) {
    Category.findAll()
      .then(categories => res.status(200).json({
        message: 'categories retrieved successfully', success: true, categories
      }))
      .catch(error => res.status(500).json(error));
  }

  /**
  * @description -This method get articles by category
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and articles
  */
  static getArticlesByCategory(req, res) {
    const { categoryName } = req.params;
    Category.findOne({
      where: { category: categoryName.toLowerCase() },
    })
      .then((article) => {
        if (article) {
          return Article.findAll({
            where: { categoryId: article.id },
            include: [
              { model: Category },
              { model: Tag, as: 'Tags', through: 'ArticlesTags' },
              {
                model: Like,
                as: 'likes',
                include: [{
                  model: User,
                  attributes: ['username', 'email']
                }]
              }
            ]
          });
        }
        res.status(404).json({ message: 'category does not exist', success: false });
      })
      .then((articles) => {
        if (articles.length === 0) {
          res.status(404).json({ message: 'there are no articles on this category', success: false });
        }
        res.status(200).json({
          message: 'articles retrieved successfully', success: true, articles
        });
      })
      .catch(error => res.status(500).json(error));
  }

  /**
  * @description -This method creates a category
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and category details
  */
  static createCategory(req, res) {
    const { category } = req.body.category;
    Category.findOrCreate({
      where: {
        category: req.body.category
      },
      defaults: {
        category
      }
    })
      .spread((categories, created) => {
        if (!created) {
          res.status(200).json({ status: false, message: 'this category already exists' });
        } else {
          res.status(200).json({ status: true, categories, message: 'category created successfully' });
        }
      });
  }
}
