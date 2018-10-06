import bcrypt from 'bcrypt';
import crypto from 'crypto'; // use node buildIn crypto to generate email verification token
import Model from '../models';
import Authenticator from '../middlewares/authenticator';
import emailMessages from '../helpers/emailMessages';
import sendMail from '../helpers/mail';

const { User } = Model;
const { generateToken } = Authenticator;
const { verificationMessageHTML, verificationMessageTEXT } = emailMessages;
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
    const verifyToken = crypto.createHmac('sha256', 'seticify').digest('hex');

    bcrypt.hash(password, saltRounds)
      .then(hashedPassword => User.create({
        username, email, password: hashedPassword, verifyToken
      })
        .then((user) => {
          const { id } = user;
          const token = generateToken({ id });
          // set the url
          const url = `http://${req.headers.host}/api/v1/${verifyToken}`;
          // send verification mail to user
          sendMail({
            email: user.email,
            subject: 'Email Verification',
            textMessage: verificationMessageTEXT(user.username, url),
            htmlMessage: verificationMessageHTML(user.username, url)
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
        .catch(error => res.status(400).send(error)));
  }
}
