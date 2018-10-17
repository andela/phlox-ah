import Model from '../models';

const { LikeReply, Reply } = Model;

/**
  * @class ArticleController
  * @description CRUD operations on Article
  */
export default class LikeReplyController {
  /**
  * @description -This method likes an article
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and reaction details
  */
  static likeReply(req, res) {
  // Check the params passed by user to determine what function to be performed
  // const like = req.params.likeType === 'like';
  // const dislike = req.params.likeType === 'dislike';
  // // message to be sent to user depending on function performed
  // const message = like || dislike ? `you ${req.params.likeType}d the article`
  //   : 'you unliked the article';
    const message = 'you liked this reply';

    Reply.findOne({
      where: { id: req.params.replyId }
    }).then((reply) => {
      if (reply) {
        LikeReply.findOrCreate({
          where: {
            userId: req.user.id,
            replyId: req.params.replyId
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
        res.status(404).json({ message: 'reply does not exist', status: 'failed' });
      }
    });
  }

  /**
  * @description -This method likes an article
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and reaction details
  */
  static dislikeReply(req, res) {
  // Check the params passed by user to determine what function to be performed
  // const like = req.params.likeType === 'like';
  // const dislike = req.params.likeType === 'dislike';
  // // message to be sent to user depending on function performed
  // const message = like || dislike ? `you ${req.params.likeType}d the article`
  //   : 'you unliked the article';
    const message = 'you disliked this reply';

    Reply.findOne({
      where: { id: req.params.replyId }
    }).then((reply) => {
      if (reply) {
        LikeReply.findOrCreate({
          where: {
            userId: req.user.id,
            replyId: req.params.replyId
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
        res.status(404).json({ message: 'reply does not exist', status: 'failed' });
      }
    });
  }
}
