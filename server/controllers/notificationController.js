import env from 'dotenv';
import Model from '../models';
import notificationMessages from '../helpers/notificationMessages';
import sendMail from '../helpers/mail';

/* eslint-disable no-unused-vars */
const { User, Followings, Like } = Model;


env.config();
/**
  * @class NotificationController
  * @description Handle operations on Notifications
  */
class Notifications {
  /**
  * @description -This method notifies users about new articles posted by users they follow.
   * @param {Integer} userId - User ID of the author
   * @param {String} articleSlug - Article slug
   * @param {string} title - Title of the Article
   * @param {string} authorsUsername - Authors Username
   * @returns {object} res
   */
  static notifyForArticle(userId, articleSlug, title, authorsUsername) {
    Followings
      .findAll({ where: { followed: userId }, include: [{ model: User, attributes: ['email'], }] })
      .then((followers) => {
        // map all the followers email to an array and store it in the emails variable
        const emails = followers.map(follower => follower.User.email);
        if (emails.length > 0) {
          const url = `${process.env.BASE_URL}/articles/${articleSlug}`;
          // notify all the followers about the new article
          sendMail({
            email: emails,
            subject: 'New Article Notification',
            htmlMessage: notificationMessages.newArticleNotification(authorsUsername, url, title)
          });
        }
      });
  }

  /**
  * @description -This method notifies users of new interactions on articles they liked
   * @param {String} articleSlug - Article slug
   * @param {string} commentersUserId - UserID of the user that commented
   * @returns {object} res
   */
  static notifyLikers(articleSlug, commentersUserId) {
    let commentersUsername;
    // get the username of the user that commented
    User.findOne({ where: { id: commentersUserId } })
      .then((user) => {
        commentersUsername = user.username;
      })
      .then(() => {
        Like
          .findAll({ where: { like: true, articleSlug }, include: [{ model: User, attributes: ['email'], }] })
          .then((likers) => {
            // map all the likers email to an array and store it in the emails variable
            const emails = likers.map(liker => liker.User.email);
            if (emails.length > 0) {
              const url = `${process.env.BASE_URL}/articles/${articleSlug}`;
              // notify all the likers about the new comment
              sendMail({
                email: emails,
                subject: `${commentersUsername} commented on an article you liked.`,
                htmlMessage: notificationMessages.commentNotification(url, commentersUsername)
              });
            }
          });
      });
  }
}

export default Notifications;
