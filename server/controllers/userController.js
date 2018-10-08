import bcrypt from 'bcrypt';
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
}
