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
    req.body.email = req.body.email.toLowerCase().replace(/\s/g, '');
    req.body.username = req.body.username.replace(/\s/g, '');
    const joiSchema = {
      email: Joi.string().email().required(),
      password: Joi.string().alphanum().min(8).required(),
      username: Joi.string().min(2).required(),
    };
    const joiOptions = { abortEarly: false };
    const {
      username, email, password
    } = req.body;
    Joi.validate({
      email, username, password,
    }, joiSchema, joiOptions, (err) => {
      if (err) {
        const getErrorMessages = error => error.message.replace(/"/g, '');
        res.status(422).json({ message: err.details.map(getErrorMessages), });
      } else if (!err) {
        return next();
      }
    });
  }
}

export default UserValidations;
