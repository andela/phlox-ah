import Model from '../models';

const {
  CommentsHistory, ArticleComment, User, Article
} = Model;
/**
  * @class CommentsHistoryController
  * @description CRUD operations on Article
  */
export default class CommentsHistoryController {
  /**
  * @description -This method creates a new history for a comment
  * @param {object} userId - The request payload sent from the edit comment
  * @param {object} commentId - The response payload sent from the edit comment
  * @param {object} articleSlug - The response payload sent from the edit comment
  * @param {object} comment - The response payload sent from the edit comment
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and tag detail
  */
  static createNewHistory(userId, commentId, articleSlug, comment, res) {
    CommentsHistory.create({
      userId, commentId, articleSlug, comment
    })
      .then(history => history)
      .catch(() => res.status(500).json({ success: false, message: 'Unable to edit comment, please try again' }));
  }

  /**
  * @description -This method creates a new history for a comment
  * @param {object} req - The request payload sent from the edit comment
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and tag detail
  */
  static getMyCommentHistory(req, res) {
    ArticleComment.findOne({
      where: { articleSlug: req.params.articleSlug, id: req.params.commentId },
    }).then((comment) => {
      if (comment) {
        CommentsHistory.findAll({
          // eslint-disable-next-line
          where: { commentId: req.params.commentId, articleSlug: req.params.articleSlug, userId: req.user.id },
          order: [
            ['createdAt', 'DESC'],
          ],
          include: [{
            model: User,
            attributes: ['username', 'email']
          },
          {
            model: ArticleComment,
            attributes: ['comment']
          },
          {
            model: Article,
            attributes: ['title', 'body', 'description']
          }]
        })
          .then((histories) => {
            if (histories.length >= 1) {
              res.status(200).json({ success: true, message: 'comment history retrieved', histories });
            } else if (histories.length <= 0) {
              res.status(200).json({ success: false, message: 'you have no histories for this comment' });
            } else {
              res.status(404).json({ success: false, message: 'comment cannot be found' });
            }
          })
          .catch(error => res.status(500).json(error));
      } else {
        res.status(404).json({ success: false, message: 'comment cannot be found' });
      }
    })
      .catch(error => res.status(500).json(error));
  }

  /**
  * @description -This method creates a new history for a comment
  * @param {object} req - The request payload sent from the edit comment
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and tag detail
  */
  static getAllCommentHistory(req, res) {
    ArticleComment.findOne({
      where: { articleSlug: req.params.articleSlug, id: req.params.commentId },
    }).then((comment) => {
      if (comment) {
        CommentsHistory.findAll({
          // eslint-disable-next-line
          where: { commentId: req.params.commentId, articleSlug: req.params.articleSlug },
          order: [
            ['createdAt', 'DESC'],
          ],
          include: [{
            model: User,
            attributes: ['username', 'email']
          },
          {
            model: ArticleComment,
            attributes: ['comment']
          },
          {
            model: Article,
            attributes: ['title', 'body', 'description']
          }]
        })
          .then((histories) => {
            if (histories.length >= 1) {
              res.status(200).json({ success: true, message: 'all comment histories retrieved', histories });
            } else if (histories.length <= 0) {
              res.status(200).json({ success: false, message: 'there are no histories for this comment' });
            } else {
              res.status(404).json({ success: false, message: 'comment cannot be found' });
            }
          })
          .catch(error => res.status(500).json(error));
      } else {
        res.status(404).json({ success: false, message: 'comment cannot be found' });
      }
    })
      .catch(error => res.status(500).json(error));
  }
}
