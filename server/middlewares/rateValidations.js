import Joi from 'joi';
import joiValidations from '../helpers/validations/joiValidations';
/**
 * @class RateValidationsController
  * @description Validate Ratings submitted by user
 */
class RateValidations {
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
  static validateRating(req, res, next) {
    if (req.body.rating) {
      const { rating } = req.body;
      const joiSchema = {
        rating: Joi.number().positive().min(0).max(5)
          .required(),
      };
      // this tells Joi to check for all errors in user input before giving out a response
      const joiOptions = { abortEarly: false };
      joiValidations({ rating }, joiSchema, joiOptions, res, next);
    } else {
      res.status(400).json({ message: 'Bad Request', status: 'failed', });
    }
  }
}

export default RateValidations;
