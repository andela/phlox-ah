import Model from '../models';
import CommentHelpers from '../helpers/comment';

const { User, Article, ArticleComment, Reply: ReplyArticleComment } = Model;

const { commentDetail, replyCommentDetail } = CommentHelpers;



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

    const data = commentDetail(req);

    return Article.findOne({
      where: { slug: data.articleSlug }
    })
      .then(article => {
        if(article){
          return ArticleComment.create(data);
        } else {
          return null;
        }
      })
      .then(comment => {
        if(comment) {
          return res.status(201).json({success: true, message: 'Comment added successfully', comment});
        } else {
          return res.status(404).json({success: false, message: 'Article could not be found'});
        }
      })
      .catch(() => res.status(500).json({success: false, message: 'Comment could not be added'}));

  }

  /**
   * @description -This method modifies comment related to a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and comment detail
   */
  static editArticleComment(req, res) {

    const data = commentDetail(req);

    return ArticleComment.findOne({
      where: { userId: data.userId, id: data.commentId }
    })
      .then(comment => {
        if(comment) {
          return comment.update(data);
        } else {
          return null;
        }
      })
      .then(comment => {
        if(comment){
          return res.status(200).json({success: true, message: 'Comment updated successfully', comment});
        } else {
          return res.status(404).json({success: false, message: 'Comment could not be found'});
        }
      })
      .catch(() => res.status(500).json({success: false, message: 'Comment could not be added'}));

  }

  /**
   * @description -This method modifies reply to a particular article comment
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and comment detail
   */
  static editReplyArticleComment(req, res) {

    const data = replyCommentDetail(req);

    return ReplyArticleComment.findOne({
      where: { 
        userId: data.userId, 
        id: data.replyCommentId,
        commentId: data.commentId,
      }
    })
      .then(comment => {
        if(comment) {
          return comment.update(data);
        } else {
          return null;
        }
      })
      .then(comment => {
        if(comment){
          return res.status(200).json({success: true, message: 'Comment updated successfully', comment});
        } else {
          return res.status(404).json({success: false, message: 'Comment could not be found'});
        }
      })
      .catch(() => {
        return res.status(500).json({success: false, message: 'Comment could not be added'});
      })

  }

  /**
   * @description -This method gets all comments related to a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and comment detail array
   */
  static getArticleComment(req, res) {

    return ArticleComment.findAll({
      where: {articleSlug: req.params.articleSlug},
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
      .then(comments => {
        return res.status(200).json({success: true, message: 'Comments fetched successfully', comments});
      })
      .catch(() => res.status(500).json({success: false, message: 'Comment could not be fetched'}));

  }

  /**
   * @description -This method adds reply(comment) to a comment of a particular article
   * @param {object} req - The request payload sent from the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status, message and comment detail
   */
  static replyArticleComment(req, res) {

    const data = replyCommentDetail(req);

    return ArticleComment.findOne({
      where: { userId: data.userId, id: data.commentId }
    })
      .then(comment => {
        if(comment) {
          return ReplyArticleComment.create(data);
        } else {
          return null;
        }
      })
      .then(comment => {
        if(comment){
          return res.status(201).json({success: true, message: 'Comment added successfully', comment});
        } else {
          return res.status(404).json({success: false, message: 'Comment could not be found'});
        }
      })
      .catch(() => res.status(500).json({success: false, message: 'Comment could not be added'}));

  }

}
