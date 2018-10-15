import Joi from 'joi';
import checkJoiValidation from '../helpers/validations/checkJoiValidation';
/**
  * @class TagValidationsController
  * @description This validates tags sent along with an article
  */
class TagValidations {
  /**
   *
   *
   * @static
   * @param {object} req The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @param {object} next - The next function to call if validation passes
   * @memberof tagValidations
   * @returns {object} - status Message if validation fails or proceeds to next()
   */
  static validateTag(req, res, next) {
    if (req.body.tags) {
      const { tags } = req.body;
      const joiSchema = {
        tags: Joi.array()
      };
      // this tells Joi to check for all errors in user input before giving out a response
      const joiOptions = { abortEarly: false };
      checkJoiValidation({ tags }, joiSchema, joiOptions, res, next);
    } else {
      res.status(400).json({ message: 'Bad Request', status: 'failed', });
    }
  }
}

export default TagValidations;
