import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import Model from '../models';
import Authenticator from '../middlewares/authenticator';


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
          const token = generateToken({
            id: user.dataValues.id, username: user.username, email: user.email
          });
          res.status(201).json({ success: true, message: 'User successfully signed up', token });
        })
        .catch(error => res.status(409).json({ message: error.errors[0].message })));
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
        const { id, username } = user;
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = generateToken({ id, username });
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
}
