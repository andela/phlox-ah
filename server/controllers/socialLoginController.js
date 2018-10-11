/* eslint-disable object-curly-newline */
import Model from '../models';
import Authenticator from '../middlewares/authenticator';


const { User } = Model;
const { generateToken } = Authenticator;

/**
 * @class SocialLoginController
 */
class SocialLoginController {
  /**
   * @description - find  or create a new user and pass the user to the request body
   * @param {object} user
   * @param {function} done
   * @returns {object} createOrFindUser
   */
  static findOrCreateUser(user, done) {
    User.findOrCreate({
      where: { email: user.email },
      // users signing up via socialmedia should be verified  authomatically
      // given a random password since password cannot be null
      defaults: { isVerified: true, username: user.email, password: '5kb3455uf884545i44i' },
    }).spread((foundOrCreatedUser, created) => {
      const { id, email, username } = foundOrCreatedUser.dataValues;
      done(null, { email, id, username, created, });
    });
  }

  /**
    * @description generate a token and display a response to users
    * @static
    * @param {object} req
    * @param {object} res
    * @returns {json} json
  */
  static respondWithToken(req, res) {
    const user = { id: req.user.id, email: req.user.email, username: req.user.username };
    const token = generateToken(user);
    // if a new user was created
    if (req.user.created) {
      return res.status(201).send({ success: true, message: 'you have successfully signed up', user, token });
    }
    return res.status(200).send({ success: true, message: 'you are logged in', user, token });
  }

  /**
   * @description - callback function for passport strategy
   * @param {object} accessToken
   * @param {object} refreshToken
   * @param {object} profile
   * @param {function} done
   * @returns {json} json
   */
  static passportCallback(accessToken, refreshToken, profile, done) {
    const userProfile = { email: profile.emails[0].value, };
    SocialLoginController.findOrCreateUser(userProfile, done);
  }
}
export default SocialLoginController;
