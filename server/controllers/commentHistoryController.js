import Model from '../models';
import getCommentHistory from '../helpers/commentsHistory';

const { CommentsHistory, ArticleComment } = Model;
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
        const searchParams = {
          commentId: req.params.commentId, articleSlug: req.params.articleSlug, userId: req.user.id
        };
        getCommentHistory(searchParams, res, 'comment history retrieved', 'you have no histories for this comment');
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
        const searchParams = {
          commentId: req.params.commentId, articleSlug: req.params.articleSlug
        };
        getCommentHistory(searchParams, res, 'all comment histories retrieved', 'there are no histories for this comment');
      } else {
        res.status(404).json({ success: false, message: 'comment cannot be found' });
      }
    })
      .catch(error => res.status(500).json(error));
  }
}
