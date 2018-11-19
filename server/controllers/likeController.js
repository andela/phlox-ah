import Model from '../models';

const { Like, Article } = Model;

/**
  * @class LikeControler
  * @description like and dislike an article
  */
export default class LikeController {
  /**
  * @description -This method likes an article
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and reaction details
  */
  static likeArticle(req, res) {
    const message = 'you liked this article';
    Article.findOne({
      where: { slug: req.params.slug }
    }).then((article) => {
      if (article) {
        Like.findOrCreate({
          where: {
            userId: req.user.id,
            articleSlug: req.params.slug
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
                res.status(200).json({ reaction, message: 'you unliked this article' });
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
        res.status(404).json({ message: 'article does not exist', status: 'failed' });
      }
    });
  }

  /**
  * @description -This method dislikes an article
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and reaction details
  */
  static dislikeArticle(req, res) {
    const message = 'you disliked this article';

    Article.findOne({
      where: { slug: req.params.slug }
    }).then((article) => {
      if (article) {
        Like.findOrCreate({
          where: {
            userId: req.user.id,
            articleSlug: req.params.slug
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
                res.status(200).json({ reaction, message: 'you unliked this article' });
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
        res.status(404).json({ message: 'article does not exist', status: 'failed' });
      }
    });
  }

  /**
  * @description -This method gets the lke status
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status and reaction details
  */
  static getLikeStatus(req, res) {
    Like.find({
      where: {
        userId: req.user.id,
        articleSlug: req.params.slug
      }
    })
      .then((like) => {
        if (like) {
          return res.status(200).json({ success: true, status: like.like });
        }
        return res.status(200).json({ success: true, status: null });
      })
      .catch(error => res.status(500).json(error));
  }
}
