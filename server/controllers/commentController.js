import Model from '../models';
import CommentHelpers from '../helpers/comment';
import CommentsHistoryController from './commentHistoryController';
import Notification from './notificationController';

const {
  User, Article, ArticleComment, Reply: ReplyArticleComment
} = Model;

const { reqCommentParams, reqReplyParams } = CommentHelpers;


/**
  * @class CommentController
  * @description CRUD operations on Article Comment
  */
export default class CommentController {
  /**
  * @description -This method adds comment to a particular article
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and comment detail
  */
  static createArticleComment(req, res) {
    const data = reqCommentParams(req);

    return Article.findOne({
      where: { slug: data.articleSlug }
    })
      .then((article) => {
        if (article) {
          return ArticleComment.create(data);
        }
        return null;
      })
      .then((comment) => {
        if (comment) {
          Notification.notifyLikers(data.articleSlug, data.userId);
          return res.status(201).json({ success: true, message: 'Comment added successfully', comment });
        }
        return res.status(404).json({ success: false, message: 'Article could not be found' });
      })
      .catch(() => res.status(500).json({ success: false, message: 'Comment could not be added' }));
  }

  /**
   * @description -This method modifies comment related to a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and comment detail
   */
  static editArticleComment(req, res) {
    const data = reqCommentParams(req);

    return ArticleComment.findOne({
      where: { userId: data.userId, id: data.commentId }
    })
      .then((comment) => {
        if (comment) {
          // eslint-disable-next-line
          CommentsHistoryController.createNewHistory(req.user.id, comment.id, comment.articleSlug, comment.comment, res);
          return comment.update(data);
        }
        return null;
      })
      .then((comment) => {
        if (comment) {
          return res.status(200).json({ success: true, message: 'Comment updated successfully', comment });
        }
        return res.status(404).json({ success: false, message: 'Comment could not be found' });
      })
      .catch(() => res.status(500).json({ success: false, message: 'Comment could not be added' }));
  }

  /**
   * @description -This method modifies reply to a particular article comment
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and comment detail
   */
  static editReplyArticleComment(req, res) {
    const data = reqReplyParams(req);

    return ReplyArticleComment.findOne({
      where: {
        userId: data.userId,
        id: data.replyCommentId,
        commentId: data.commentId,
      }
    })
      .then((comment) => {
        if (comment) {
          return comment.update(data);
        }
        return null;
      })
      .then((comment) => {
        if (comment) {
          return res.status(200).json({ success: true, message: 'Comment updated successfully', comment });
        }
        return res.status(404).json({ success: false, message: 'Comment could not be found' });
      })
      .catch(() => res.status(500).json({ success: false, message: 'Comment could not be added' }));
  }

  /**
   * @description -This method gets all comments related to a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and comment detail array
   */
  static getArticleComment(req, res) {
    return ArticleComment.findAll({
      where: { articleSlug: req.params.articleSlug },
      include: [{
        model: User,
        attributes: ['username', 'email']
      }, {
        model: ReplyArticleComment,
        include: [{
          model: User,
          attributes: ['username', 'email']
        }]
      }]
    })
      .then(comments => res.status(200).json({ success: true, message: 'Comments fetched successfully', comments }))
      .catch(() => res.status(500).json({ success: false, message: 'Comment could not be fetched' }));
  }

  /**
   * @description -This method adds reply(comment) to a comment of a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and comment detail
   */
  static replyArticleComment(req, res) {
    const data = reqReplyParams(req);

    return ArticleComment.findOne({
      where: { userId: data.userId, id: data.commentId }
    })
      .then((comment) => {
        if (comment) {
          return ReplyArticleComment.create(data);
        }
        return null;
      })
      .then((comment) => {
        if (comment) {
          return res.status(201).json({ success: true, message: 'Comment added successfully', comment });
        }
        return res.status(404).json({ success: false, message: 'Comment could not be found' });
      })
      .catch(() => res.status(500).json({ success: false, message: 'Comment could not be added' }));
  }
}
