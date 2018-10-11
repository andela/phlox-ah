import Joi from 'joi';
import joiValidations from '../helpers/validations/joiValidations';
/**
  * @class ArticleValidationsController
  * @description Validate User Input
  */
class ArticleValidations {
  /**
   *
   *
   * @static
   * @param {object} req The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @param {object} next - The next function to call if validation passes
   * @memberof articleValidations
   * @returns {object} - status Message if validation fails or proceeds to next()
   */
  static validateCreateArticle(req, res, next) {
    const joiSchema = {
      title: Joi.string().min(6).max(150).required(),
      body: Joi.string().min(6).required(),
      description: Joi.string().min(6).max(250).required(),
      tags: Joi.array(),
    };
    // this tells Joi to proceed to check for all errors in user input before giving out a response
    const joiOptions = { abortEarly: false };
    const {
      title, body, description, tags
    } = req.body;
    joiValidations({
      title, body, description, tags
    }, joiSchema, joiOptions, res, next);
  }

  /**
   *
   *
   * @static
   * @param {object} req The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @param {object} next - The next function to call if validation passes
   * @memberof articleValidations
   * @returns {object} - status Message if validation fails or proceeds to next()
   */
  static validateUpdateArticle(req, res, next) {
    const joiSchema = {
      title: Joi.string().min(6).max(150),
      body: Joi.string().min(6),
      description: Joi.string().min(6).max(250),
      tags: Joi.array(),
    };
    // this tells Joi to proceed to check for all errors in user input before giving out a response
    const joiOptions = { abortEarly: false };
    const {
      title, body, description, tags
    } = req.body;
    joiValidations({
      title, body, description, tags
    }, joiSchema, joiOptions, res, next);
  }
}

export default ArticleValidations;
