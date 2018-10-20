import Joi from 'joi';
import checkJoiValidation from '../helpers/validations/checkJoiValidation';
/**
 * @class HighlightValidations
  * @description Validate comment on highlighted article submitted by user
 */
class HighlightValidations {
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
  static validate(req, res, next) {
    if (req.params.articleSlug && req.user.id && req.body.comment && req.body.selectedText) {
      const { comment, selectedText } = req.body;
      const { articleSlug } = req.params;
      const joiSchema = {
        articleSlug: Joi.string().required(),
        selectedText: Joi.string().required(),
        comment: Joi.string().required(),
      };
      // this tells Joi to check for all errors in user input before giving out a response
      const joiOptions = { abortEarly: false };
      checkJoiValidation({ articleSlug, selectedText, comment }, joiSchema, joiOptions, res, next);
    } else {
      res.status(400).json({ message: 'Bad Request', status: 'failed', });
    }
  }
}

export default HighlightValidations;
