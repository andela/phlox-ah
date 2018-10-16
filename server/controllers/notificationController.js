/* eslint-disable require-jsdoc */
import env from 'dotenv';
import Model from '../models';
import notificationMessages from '../helpers/notificationMessages';
import sendMail from '../helpers/mail';

/* eslint-disable no-unused-vars */
const { User, Followings, Notification } = Model;


env.config();

class Notifications {
  static notifyForArticle(userId, articleSlug, title, authorsUsername) {
    Followings
      .findAll({ where: { followed: userId }, include: [{ model: User, attributes: ['email'], }] })
      .then((followers) => {
        const emails = followers.map(follower => follower.User.email);
        if (emails.length > 0) {
          const url = `${process.env.BASE_URL}/articles/${articleSlug}`;
          sendMail({
            email: emails,
            subject: 'New Article Notification',
            htmlMessage: notificationMessages.newArticleNotification(authorsUsername, url)
          });
        }
      });
  }
}

export default Notifications;
