import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Model from '../models';
import Authenticator from '../middlewares/authenticator';
import sendMail from '../helpers/mail';

const { User } = Model;
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
      .then((userFound) => {
        const { username } = userFound;
        if (!userFound) {
          return res.status(400).json({ success: false, message: 'Email address is not registered' });
        }
        const resetToken = crypto.randomBytes(16).toString('hex');
        const options = {
          to: email,
          subject: 'Password Reset',
          html: `
            <div>
            <h3>Hi ${username},</h3>
            <p>You are receiving this because you have requested a password reset <br>
            Please click the link below or copy and paste it in your browser.</p>
            <br/>
            <a href="http://${req.headers.host}/api/reset_password/${resetToken}">http://${req.headers.host}/api/reset_password/${resetToken}</a>
            <p>If you did not request this, Please ignore this mail, your password will remain unchanged</p>
            </div>
            <p>This password expires after 10 minutes</p>
            `,
          text: `
            Hi ${username},
            You are receiving this because you have requested a password reset
            Please click the link below or copy and paste it in your browser.
            <a href="${req.headers.host}/api/reset_password/${resetToken}">${req.headers.host}/api/reset_password/${resetToken}
            If you did not request this, Please ignore this mail, your password will remain unchanged
            `
        };
        userFound.update({
          resetToken, expireAt: new Date(new Date().getTime() + (10 * 60 * 1000))
        })
          .then(() => {
            sendMail(options);
            return res.status(200).json({ success: true, message: 'A password reset link has been sent ot your email' });
          });
      })
      .catch(error => res.status(400).send(error));
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

    User.findOne({ where: { resetToken } })
      .then((userFound) => {
        if (!userFound) {
          return res.status(404).json({ success: false, message: 'This link is invalid' });
        }

        if (!(userFound.expireAt >= new Date())) {
          return res.status(400).json({ success: false, message: 'This link has expired' });
        }

        userFound.update({ password, resetToken: null, expireAt: null })
          .then(updatedUser => res.status(200).json({ success: true, message: 'Password has successfully been updated', updatedUser }));
      })
      .catch(error => res.status(400).send(error));
  }
}
