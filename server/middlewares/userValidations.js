import Joi from 'joi';
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
      password: Joi.string().alphanum().min(8).required(),
      username: Joi.string().min(2).required(),
    };
    // this tells Joi to proceed to check for all errors in user input before giving out a response
    const joiOptions = { abortEarly: false };
    const { username, email, password } = req.body;

    Joi.validate({ email, username, password, }, joiSchema, joiOptions, (err) => {
      if (err) {
        // this regex replaces the string (\") that is returned with the json response
        const getErrorMessages = error => error.message.replace(/"/g, '');
        res.status(422).json({ message: err.details.map(getErrorMessages), });
      } else if (!err) {
        return next();
      }
    });
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

    Joi.validate({ emailOrUsername, password, }, joiSchema, joiOptions, (err) => {
      if (err) {
        // this regex replaces the string (\") that is returned with the json response
        const getErrorMessages = error => error.message.replace(/"/g, '');
        res.status(422).json({ message: err.details.map(getErrorMessages), });
      } else {
        return next();
      }
    });
  }
}

export default UserValidations;
