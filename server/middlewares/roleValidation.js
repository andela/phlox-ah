import Joi from 'joi';

/**
  * @class ArticleValidationsController
  * @description Validate User Input
  */
export default class RoleValidation {
  /**
   * @static
   * @param {object} req The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @param {object} next - The next function to call if validation passes
   * @memberof articleValidations
   * @returns {object} - status Message if validation fails or proceeds to next()
   */
  static setRole(req, res, next) {
    const joiSchema = {
      role: Joi.string().valid('Admin', 'User', 'Author')
    };

    const joiOptions = { abortEarly: false };
    Joi.validate({ role: req.body.role }, joiSchema, joiOptions, (err) => {
      if (err) {
        res.status(422).json({ success: false, message: 'Invalid role input' });
      } else if (!err) {
        return next();
      }
    });
  }
}
