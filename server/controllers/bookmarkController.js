import Model from '../models';

const { Bookmark, Article } = Model;
/**
  * @class TagController
  * @description CRUD operations on Article
  */
export default class BookmarkController {
  /**
  * @description -This method shows the bookmark for an authenticated user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and tag detail
  */
  static showBookmarks(req, res) {
    Bookmark.findAll({
      where: { userId: req.user.id },
      attributes: ['userId', 'articleId'],
      include: [
        { model: Article }
      ]
    })
      .then(bookmarks => res.status(200).json({ message: 'bookmarks retrieved successfully', success: true, bookmarks }))
      .catch(error => res.status(500).json(error));
  }

  /**
  * @description -This method adds a bookmark for an authenticated user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and tag detail
  */
  static addBookmark(req, res) {
    const { articleId } = req.body;
    Bookmark.findOrCreate({
      where: {
        articleId,
        userId: req.user.id
      },
      attributes: ['userId', 'articleId'],
      include: [
        { model: Article }
      ]
    })
      .spread((bookmark, created) => {
        if (!created) {
          res.status(200).json({ success: false, message: 'You already bookmarked this article', bookmark });
        } else {
          res.status(201).json({ success: true, message: 'This article has been bookmarked', bookmark });
        }
      });
  }

  /**
  * @description -This method deletes a bookmark for an authenticated user
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and tag detail
  */
  static deleteBookmark(req, res) {
    const { articleId } = req.body;
    Bookmark.findOne({
      where: { articleId, userId: req.user.id },
    }).then((bookmark) => {
      if (!bookmark) {
        res.status(404).json({ message: 'bookmark does not exist', success: false });
      } else {
        bookmark.destroy()
          .then(() => {
            res.status(204).end();
          })
          .catch(error => res.status(500).json(error));
      }
    });
  }
}
