import bcrypt from 'bcrypt';
import crypto from 'crypto'; // use node buildIn crypto to generate email verification token
import Sequelize from 'sequelize';
import Model from '../models';
import Authenticator from '../middlewares/authenticator';
import emailMessages from '../helpers/emailMessages';
import sendMail from '../helpers/mail';
/* eslint-disable no-unused-vars */
const { User, Followings } = Model;
const { generateToken } = Authenticator;
const {
  verificationMessageHtml, verificationMessageText, resetPassMessageHtml, resetPassMessageText
} = emailMessages;
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

    // generate verification token and store in verifyToken variable
    const verifyToken = crypto.randomBytes(16).toString('hex');

    bcrypt.hash(password, saltRounds)
      .then(hashedPassword => User.create({
        username, email, password: hashedPassword, verifyToken
      })
        .then((user) => {
          const token = generateToken({
            id: user.dataValues.id, username: user.username, email: user.email
          });
          // set the url
          const url = `http://${req.headers.host}/api/v1/users/verify/${verifyToken}`;
          // send verification mail to user
          sendMail({
            email: user.email,
            subject: 'Email Verification',
            textMessage: verificationMessageText(user.username, url),
            htmlMessage: verificationMessageHtml(user.username, url)
          });
          /**
           * change message to 'User successfully signed up, an email is sent to your mail account,
           * please verify your mail account to complete registration'
           */
          res.status(201).json({
            success: true,
            message: 'User successfully signed up, an email is sent to your mail account, please verify your mail account to complete registration',
            token
          });
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
          htmlMessage: resetPassMessageHtml(username, url),
          textMessage: resetPassMessageText(username, url)
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

  /**
  * @description -This method verify user account
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message
  */
  static verifyUser(req, res) {
    const { verifyToken } = req.params;
    // find user with the unique verifytoken and is not yet verified
    User.findOne({ where: { verifyToken, isVerified: false } })
      .then((user) => {
        if (user) {
          // if user exist update their isVerified status to true and verifyToken to null
          return user.update({ isVerified: true, verifyToken: null })
            .then(() => res.status(200).json({ success: true, message: 'Thank you, account verified. You can login now' }))
            .catch(() => res.status(500).json({ success: false, message: 'Internal Server Error. Can not verify user now try again later!' }));
        }
        return res.status(422).json({ success: false, message: 'Your account is already verified' });
      })
      .catch(() => res.status(500).json({ success: false, message: 'Internal Server Error. Please try again later!' }));
  }

  /**
  * @description -This method logs in a user on authors haven and returns a token
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and logins user into authors haven
  */
  static login(req, res) {
    User.findOne({
      where: {
        [Sequelize.Op.or]: [
          { username: req.body.emailOrUsername },
          { email: req.body.emailOrUsername }]
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({ success: false, message: 'Invalid Email/Username or password' });
        }
        const {
          id, email, username, isVerified
        } = user.dataValues;

        if (!isVerified) {
          return res.status(403).json({ success: false, message: 'Please verify your account' });
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = generateToken({ id, email, username });
          res.json({
            success: true, message: 'Successfully logged in!', user, token
          });
        } else {
          res.status(400).send({ success: false, message: 'Invalid Email/Username or password' });
        }
      })
      .catch(() => {
        res.status(400)
          .send({ success: false, message: 'Invalid username/email or password' });
      });
  }

  /**
   * @description -Method to follow a user
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - message and successfully follows a user
   */
  static followUser(req, res) {
    const { user } = req;

    User.findOne({ where: { username: req.params.username } })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        const { id, username } = foundUser;

        if (user.username === username) {
          return res.status(403).json({ success: false, message: 'You cannot follow yourself' });
        }

        Followings.findOrCreate({
          where: {
            follower: id,
            followed: user.id
          }
        })
          .spread((following, created) => {
            if (!created) {
              return res.status(400).json({ success: false, message: `You already follow ${username}` });
            }
            return res.status(200).json({ success: true, message: `You are now following ${username}` });
          });
      });
  }

  /**
   * @description -Method to unfollow a user
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - message and successfully follows a user
   */
  static unfollowUser(req, res) {
    const { user } = req;

    User.findOne({ where: { username: req.params.username } })
      .then((foundUser) => {
        if (!foundUser) {
          res.status(404).json({ success: false, message: 'User not found' });
        }
        const { id, username } = foundUser;

        if (user.username === username) {
          return res.status(403).json({ success: false, message: 'You cannot unfollow yourself' });
        }
        Followings.findOne({
          where: {
            follower: id,
            followed: user.id
          }
        })
          .then((following) => {
            if (!following) {
              return res.status(400).json({ success: false, message: `You are not following ${foundUser.username}` });
            }
            following.destroy()
              .then(() => res.status(200).json({ success: true, message: `You are no longer following ${foundUser.username}` }));
          });
      });
  }

  /**
   * @description -Method to show user followers
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - json data
   */
  static followList(req, res) {
    User
      .findOne({ where: { id: req.user.id }, include: ['followed', 'follower'] })
      .then((user) => {
        const { followed, follower } = user;

        return res.status(200).json({
          success: true,
          message: 'Follows/Followers',
          following: followed,
          followers: follower
        });
      });
  }
}
