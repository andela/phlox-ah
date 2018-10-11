import Model from '../models';

const { Like, Article } = Model;

/**
  * @class ArticleController
  * @description CRUD operations on Article
  */
export default class LikeController {
  /**
  * @description -This method likes an article
  * @param {object} req - The request payload sent from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status, message and reaction details
  */
  static likeArticle(req, res) {
    // Check the params passed by user to determine what function to be performed
    const like = req.params.likeType === 'like';
    const dislike = req.params.likeType === 'dislike';
    // message to be sent to user depending on function performed
    const message = like || dislike ? `you ${req.params.likeType}d the article`
      : 'you disliked the article';

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
            like,
            dislike
          }
        })
          .spread((reaction, created) => {
            if (created) {
              reaction.like = like;
              reaction.dislike = dislike;
              reaction.save();
            }
            return res.status(200).json({ reaction, message });
          });
      } else {
        res.status(404).json({ message: 'article does not exist', status: 'failed' });
      }
    });
  }
}
