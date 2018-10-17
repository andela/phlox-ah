import Joi from 'joi';
import checkJoiValidation from '../helpers/validations/checkJoiValidation';
/**
 * @class RateValidationsController
  * @description Validate Ratings submitted by user
 */
class BookmarkValidations {
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
  static validateBookmark(req, res, next) {
    if (req.body.articleId) {
      const { articleId } = req.body;
      const joiSchema = {
        articleId: Joi.number().positive().required(),
      };
      // this tells Joi to check for all errors in user input before giving out a response
      const joiOptions = { abortEarly: false };
      checkJoiValidation({ articleId }, joiSchema, joiOptions, res, next);
    } else {
      res.status(400).json({ message: 'Bad Request', status: 'failed', });
    }
  }
}

export default BookmarkValidations;
