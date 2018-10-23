import Model from '../models';

const {
  Stats, Bookmark, Like
} = Model;

/**
* @class StatController
* @description operations on Stat
*/
export default class StatController {
  /**
  * @description -This method creates a new user on authors haven and returns a token
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and logins user into authors haven
  */
  static getStats(req, res) {
    let views;
    let bookmarks;
    let likes;

    Stats.findAndCountAll({
      where: { userId: req.user.id },
    })
      .then((statsResult) => {
        views = statsResult.count;
        Bookmark.findAndCountAll({
          where: { userId: req.user.id }
        })
          .then((bookmarkResult) => {
            bookmarks = bookmarkResult.count;
            Like.findAndCountAll({
              where: { userId: req.user.id, like: true }
            })
              .then((likesResult) => {
                likes = likesResult.count;
                res.status(200).json({
                  success: true,
                  message: 'Your Stats',
                  views: `Viewed: ${views}`,
                  bookmarks: `Bookmarked: ${bookmarks}`,
                  likes: `Liked: ${likes}`
                });
              });
          });
      })
      .catch(error => res.status(500).json(error));
  }
}
