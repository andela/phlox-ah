import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Model from '../models';
import Authenticator from '../middlewares/authenticator';
import emailMessages from '../helpers/emailMessages';
import sendMail from '../helpers/mail';

const { User } = Model;
const { resetPasswordMessageHtml, resetPasswordMessageText } = emailMessages;
const { generateToken } = Authenticator;
const saltRounds = 10;


/**
  * @class UserController
  * @description CRUD operations on Users
  */
export default class UserController {
  /**
  * @description -This method creates a new user on authors haven and returns a token
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and logins user into authors haven
  */
  static create(req, res) {
    const { username, email, password } = req.body;
    bcrypt.hash(password, saltRounds)
      .then(hashedPassword => User.create({ username, email, password: hashedPassword, })
        .then((user) => {
          const { id } = user;
          const token = generateToken({ id });
          res.status(201).json({ success: true, message: 'You have successfully signed up!', token });
        })
        .catch(error => res.status(409).json({ message: error.errors[0].message })));
  }

  /**
  * @description -This method send a mail to reset his password
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and confirms the mail has been sent
  */
  static forgetPassword(req, res) {
    const { email } = req.body;

    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ success: false, message: 'Email address is not registered' });
        }
        const { username } = user;
        const resetToken = crypto.randomBytes(16).toString('hex');
        const url = `http://${req.headers.host}/api/reset_password/${resetToken}`;
        const options = {
          email,
          subject: 'Password Reset',
          htmlMessage: resetPasswordMessageHtml(username, url),
          textMessage: resetPasswordMessageText(username, url)
        };
        user.update({
          resetToken, expireAt: new Date(new Date().getTime() + (10 * 60 * 1000))
        })
          .then(() => {
            sendMail(options);
            return res.status(200).json({ success: true, message: 'A password reset link has been sent ot your email' });
          });
      });
  }

  /**
  * @description -This method send a mail to reset his password
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and confirms the mail has been sent
  */
  static resetPassword(req, res) {
    const resetToken = req.params.token;
    const { password } = req.body;

    User.find({ where: { resetToken } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ success: false, message: 'This link is invalid' });
        }

        if (!(user.expireAt >= new Date())) {
          return res.status(400).json({ success: false, message: 'This link has expired' });
        }

        user.update({ password, resetToken: null, expireAt: null })
          .then(updatedUser => res.status(200).json({ success: true, message: 'Password has been successfully updated', updatedUser }));
      });
  }
}
