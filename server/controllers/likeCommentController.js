import Model from '../models';

const { LikeComment, ArticleComment } = Model;

/**
  * @class LikeCommentControler
  * @description like and dislike a comment
  */
export default class LikeCommentController {
  /**
  * @description -This method likes a comment
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and reaction details
  */
  static likeComment(req, res) {
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
            if (!created) {
              if (reaction.like === true) {
                reaction.like = null;
                reaction.save();
                res.status(200).json({ reaction, message: 'you unliked this comment' });
              } else {
                reaction.like = true;
                reaction.save();
                res.status(200).json({ reaction, message });
              }
            } else {
              reaction.like = true;
              reaction.save();
              res.status(200).json({ reaction, message });
            }
          });
      } else {
        res.status(404).json({ message: 'comment does not exist', status: 'failed' });
      }
    });
  }

  /**
  * @description -This method dislikes a comment
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and reaction details
  */
  static dislikeComment(req, res) {
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
            if (!created) {
              if (reaction.like === false) {
                reaction.like = null;
                reaction.save();
                res.status(200).json({ reaction, message: 'you unliked this comment' });
              } else {
                reaction.like = false;
                reaction.save();
                res.status(200).json({ reaction, message });
              }
            } else {
              reaction.like = false;
              reaction.save();
              res.status(200).json({ reaction, message });
            }
          });
      } else {
        res.status(404).json({ message: 'comment does not exist', status: 'failed' });
      }
    });
  }
}
