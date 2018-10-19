import env from 'dotenv';
import Model from '../models';
import notificationMessages from '../helpers/notificationMessages';
import sendMail from '../helpers/mail';

/* eslint-disable object-curly-newline */
const { User, Followings, Like, Notification } = Model;


env.config();
/**
  * @class NotificationController
  * @description Handle operations on Notifications
  */
class Notifications {
  /**
     * @description - This method saves notification to the database
     * @param {List} userIds - The user ID of the notification owner
     * @param {String} articleSlug - The slug of article been notified about
     * @param {String} message - Notification message
     * @returns {object} res
     */
  static saveNotification(userIds, articleSlug, message) {
    const newNotifications = userIds.map(userId => ({ userId, articleSlug, message }));
    newNotifications.forEach((newNotification) => {
      Notification.findOrCreate({
        where: {
          userId: newNotification.userId,
          articleSlug: newNotification.articleSlug
        },
        defaults: { message }
      });
    });
  }

  /**
     * @description - This method fetches all the notification for a particular user from database
     * @param {List} req - Request Payload
     * @param {String} res - Response payload
     * @returns {object} res
     */
  static getNotifications(req, res) {
    Notification
      .findAll({
        where: { userId: req.user.id },
      })
      .then((notifications) => {
        const count = notifications.length;
        res.status(200).json({ success: true, notifications, count });
      })
      .catch(error => res.status(500).json(error));
  }

  /**
     * @description - This method gets all the unread notifications for a particular user
     * @param {List} req - Request Payload
     * @param {String} res - Response payload
     * @returns {object} res
     */
  static getUnseenNotifications(req, res) {
    Notification
      .findAll({
        where: { userId: req.user.id, seen: false },
      })
      .then((unseenNotifications) => {
        const count = unseenNotifications.length;
        res.status(200).json({ success: true, unseenNotifications, count });
      })
      .catch(error => res.status(500).json({ success: false, error }));
  }

  /**
     * @description - This method marks a particular notification as seen/read
     * @param {List} req - Request Payload
     * @param {String} res - Response payload
   * @returns {object} res
   */
  static markAsSeen(req, res) {
    Notification
      .update({ seen: true }, { where: { userId: req.user.id, id: req.params.notificationId } })
      .then((count, notification) => {
        res.status(200).json({ success: true, message: 'successfully marked as seen', notification });
      })
      .catch(error => res.status(500).json({ success: false, error }));
  }

  /**
     * @description - This method marks a particular notification as Unseen/unread
     * @param {List} req - Request Payload
     * @param {String} res - Response payload
   * @returns {object} res
   */
  static markAsUnseen(req, res) {
    Notification
      .update({ seen: false }, { where: { userId: req.user.id, id: req.params.notificationId } })
      .then((count, notification) => {
        res.status(200).json({ success: true, message: 'successfully marked as unseen', notification });
      })
      .catch(error => res.status(500).json({ success: false, error }));
  }


  /**
     * @description - This method allows a user to opt out of email notification
     * @param {List} req - Request Payload
     * @param {String} res - Response payload
   * @returns {object} res
   */
  static optOut(req, res) {
    User
      .update({ emailNotification: false }, { where: { id: req.user.id } })
      .then(() => {
        res.status(200).json({ success: true, message: 'successfully opted out of notification' });
      })
      .catch(error => res.status(500).json({ success: false, error }));
  }

  /**
     * @description - This allows a user to opt in to email notification
     * @param {List} req - Request Payload
     * @param {String} res - Response payload
   * @returns {object} res
   */
  static optIn(req, res) {
    User
      .update({ emailNotification: true }, { where: { id: req.user.id } })
      .then(() => {
        res.status(200).json({ success: true, message: 'successfully opted in to notification' });
      })
      .catch(error => res.status(500).json({ success: false, error }));
  }

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
    // find the iD's of all followers and send them an inApp notification
      .findAll({
        where: { followed: userId },
        include: [{ model: User, attributes: ['id'], }]
      })
      .then((followers) => {
        const userIds = followers.map(follower => follower.User.id);
        const message = `${authorsUsername} posted a new article`;
        Notifications.saveNotification(userIds, articleSlug, message);
      })
      .then(() => {
        Followings
          // find the Emails's of all followers who opted in and send them a mail notification
          .findAll({
            where: { followed: userId },
            include: [{ model: User, where: { emailNotification: true }, attributes: ['email'], }]
          })
          .then((followers) => {
            const emails = followers.map(follower => follower.User.email);
            if (emails.length > 0) {
              const url = `${process.env.BASE_URL}/articles/${articleSlug}`;
              sendMail({
                email: emails,
                subject: `${authorsUsername} posted a new article`,
                htmlMessage:
                notificationMessages.newArticleNotification(authorsUsername, url, title)
              });
            }
          });
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
          // find the iD's of all that liked an article and send them an inApp notification
          .findAll({ where: { like: true, articleSlug }, include: [{ model: User, attributes: ['id'], }] })
          .then((likers) => {
            const userIds = likers.map(liker => liker.User.id);
            if (userIds.length > 0) {
              const message = `${commentersUsername} commented on an article you liked.`;
              Notifications.saveNotification(userIds, articleSlug, message);
            }
          })
          .then(() => {
            Like
              // find the Emial's of all that liked an article and send them an email notification
              .findAll({ where: { like: true, articleSlug }, include: [{ model: User, where: { emailNotification: true }, attributes: ['email'], }] })
              .then((likers) => {
                const emails = likers.map(liker => liker.User.email);
                if (emails.length > 0) {
                  const url = `${process.env.BASE_URL}/articles/${articleSlug}`;
                  sendMail({
                    email: emails,
                    subject: `${commentersUsername} commented on an article you liked.`,
                    htmlMessage: notificationMessages.commentNotification(url, commentersUsername)
                  });
                }
              });
          });
      });
  }
}

export default Notifications;
