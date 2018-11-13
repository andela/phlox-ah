import Joi from 'joi';
import checkJoiValidation from '../helpers/validations/checkJoiValidation';
/**
  * @class UserValidationsController
  * @description Validate User Input
  */
class UserValidations {
  /**
   *
   *
   * @static
   * @param {object} req The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @param {object} next - The next function to call if validation passes
   * @memberof userValidations
   * @returns {object} - status Message if validation fails or proceeds to next()
   */
  static validateSignup(req, res, next) {
    // this function validates the input the user sends when trying to register

    // check if email and username is defined
    if (req.body.email && req.body.username) {
      /* this regex removes all the white space characters in the email and username, and also
       converts  to lowercase */
      req.body.email = req.body.email.toLowerCase().replace(/\s/g, '');
      req.body.username = req.body.username.replace(/\s/g, '');
    }


    const joiSchema = {
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).error(() => ({
        message: 'Password must contain a minimum of 1 uppercase letter, 1 lowercase letter, 1 number and must be at least 8 characters'
      })),
      username: Joi.string().min(2).required(),
    };
    // this tells Joi to proceed to check for all errors in user input before giving out a response
    const joiOptions = { abortEarly: false };
    const { username, email, password } = req.body;
    checkJoiValidation({ email, username, password, }, joiSchema, joiOptions, res, next);
  }

  /**
   *
   *
   * @static
   * @param {object} req The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @param {object} next - The next function to call if validation passes
   * @memberof userValidations
   * @returns {object} - status Message if validation fails or proceeds to next()
   */
  static validateLogin(req, res, next) {
    // this function validates the input the user sends when trying to login

    // check if email or username is defined
    if (req.body.emailOrUsername) {
      /* this regex removes all the white space characters in the email or username and also
       converts  to lowercase */
      req.body.emailOrUsername = req.body.emailOrUsername.toLowerCase().replace(/\s/g, '');
    }

    const joiSchema = {
      emailOrUsername: Joi.string().required(),
      password: Joi.string().required(),
    };
    // this tells Joi to proceed to check for all errors in user input before giving out a response
    const joiOptions = { abortEarly: false };
    const { emailOrUsername, password } = req.body;
    checkJoiValidation({ emailOrUsername, password, }, joiSchema, joiOptions, res, next);
  }
}

export default UserValidations;
