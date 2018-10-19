import Model from '../models';

const { LikeReply, Reply } = Model;

/**
  * @class LikeReplyController
  * @description like and dislike a comment reply
  */
export default class LikeReplyController {
  /**
  * @description -This method likes a comment reply
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and reaction details
  */
  static likeReply(req, res) {
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
            like: true
          }
        })
          .spread((reaction, created) => {
            if (!created) {
              if (reaction.like === true) {
                reaction.like = null;
                reaction.save();
                res.status(200).json({ reaction, message: 'you unliked this reply' });
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
        res.status(404).json({ message: 'reply does not exist', status: 'failed' });
      }
    });
  }

  /**
  * @description -This method dislikes a comment reply
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and reaction details
  */
  static dislikeReply(req, res) {
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
            like: false
          }
        })
          .spread((reaction, created) => {
            if (!created) {
              if (reaction.like === false) {
                reaction.like = null;
                reaction.save();
                res.status(200).json({ reaction, message: 'you unliked this reply' });
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
        res.status(404).json({ message: 'reply does not exist', status: 'failed' });
      }
    });
  }
}
