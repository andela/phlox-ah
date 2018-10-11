import Model from '../models';

const { Tag } = Model;
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
    const { name } = req.body;
    Tag.create({ name })
      .then(tag => res.status(201).json({ message: 'Tag created successfully', status: 'success', tag }))
      .catch(error => res.status(500).json(error));
  }
}
