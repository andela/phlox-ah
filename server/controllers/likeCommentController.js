import Model from '../models';

const { LikeComment, ArticleComment } = Model;

/**
  * @class ArticleController
  * @description CRUD operations on Article
  */
export default class LikeCommentController {
  /**
  * @description -This method likes an article
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and reaction details
  */
  static likeComment(req, res) {
  // Check the params passed by user to determine what function to be performed
  // const like = req.params.likeType === 'like';
  // const dislike = req.params.likeType === 'dislike';
  // // message to be sent to user depending on function performed
  // const message = like || dislike ? `you ${req.params.likeType}d the article`
  //   : 'you unliked the article';
    const message = 'you liked this comment';

    ArticleComment.findOne({
      where: { id: req.params.commentId }
    }).then((comment) => {
      if (comment) {
        LikeComment.findOrCreate({
          where: {
            userId: req.user.id,
            commentId: req.params.commentId
          },
          defaults: {
            like: true,
            dislike: false
          }
        })
          .spread((reaction, created) => {
            if (created) {
              reaction.save();
            } else {
              reaction.save();
            }
            return res.status(200).json({ reaction, message });
          });
      } else {
        res.status(404).json({ message: 'comment does not exist', status: 'failed' });
      }
    });
  }

  /**
  * @description -This method likes an article
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and reaction details
  */
  static dislikeComment(req, res) {
  // Check the params passed by user to determine what function to be performed
  // const like = req.params.likeType === 'like';
  // const dislike = req.params.likeType === 'dislike';
  // // message to be sent to user depending on function performed
  // const message = like || dislike ? `you ${req.params.likeType}d the article`
  //   : 'you unliked the article';
    const message = 'you disliked this comment';

    ArticleComment.findOne({
      where: { id: req.params.commentId }
    }).then((comment) => {
      if (comment) {
        LikeComment.findOrCreate({
          where: {
            userId: req.user.id,
            commentId: req.params.commentId
          },
          defaults: {
            like: false,
            dislike: true
          }
        })
          .spread((reaction, created) => {
            if (created) {
              reaction.save();
            } else {
              reaction.save();
            }
            return res.status(200).json({ reaction, message });
          });
      } else {
        res.status(404).json({ message: 'comment does not exist', status: 'failed' });
      }
    });
  }
}
