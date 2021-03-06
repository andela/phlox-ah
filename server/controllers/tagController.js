import Model from '../models';

const { Tag, Article, User } = Model;
/**
  * @class TagController
  * @description CRUD operations on Article
  */
export default class TagController {
  /**
  * @description -This method creates tag for an authenticated user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and tag detail
  */
  static createTag(req, res) {
    const { tags } = req.body;
    tags.forEach((element) => {
      Tag.findOne({
        where: { name: element },
      }).then((tag) => {
        if (!tag) {
          Tag.create({ name: element });
        }
      });
    });
    res.status(201).json({ message: 'Tags created successfully', success: true, tag: tags });
  }

  /**
  * @description -This method creates tag for an authenticated user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and tag detail
  */
  static showAllTags(req, res) {
    Tag.findAll()
      .then(tags => res.status(200).json({ message: 'Tags retrieved successfully', success: true, tags }))
      .catch(error => res.status(500).json(error));
  }

  /**
  * @description -This method creates tag for an authenticated user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and tag detail
  */
  static showOneTag(req, res) {
    Tag.findOne({
      where: { name: req.params.name },
      include: [
        {
          model: Article,
          as: 'Articles',
          through: 'ArticlesTags',
          where: { status: 'published' },
          include: [
            { model: Tag, as: 'Tags', through: 'ArticlesTags' },
            { model: User, attributes: ['username', 'email'], }
          ],
        }
      ]
    })
      .then(tag => res.status(200).json({ message: 'Tag retrieved successfully', success: true, tag }))
      .catch(error => res.status(500).json(error));
  }

  /**
  * @description -This method creates tag for an authenticated user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and tag detail
  */
  static deleteTag(req, res) {
    Tag.findOne({
      where: { name: req.params.name },
    }).then((tag) => {
      if (!tag) {
        res.status(404).json({ message: 'tag does not exist', success: false });
      } else {
        tag.destroy()
          .then(() => {
            res.status(204).end();
          })
          .catch(error => res.status(500).json(error));
      }
    });
  }
}
