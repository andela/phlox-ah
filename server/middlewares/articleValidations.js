import Joi from 'joi';
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
      title: Joi.string().required(),
      body: Joi.string().required(),
      description: Joi.string().required(),
    };
    // this tells Joi to proceed to check for all errors in user input before giving out a response
    const joiOptions = { abortEarly: false };
    const { title, body, description } = req.body;

    Joi.validate({ title, body, description }, joiSchema, joiOptions, (err) => {
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
   * @memberof articleValidations
   * @returns {object} - status Message if validation fails or proceeds to next()
   */
  static validateUpdateArticle(req, res, next) {
    const joiSchema = {
      title: Joi.string(),
      body: Joi.string(),
      description: Joi.string(),
    };
    // this tells Joi to proceed to check for all errors in user input before giving out a response
    const joiOptions = { abortEarly: false };
    const { title, body, description } = req.body;

    Joi.validate({ title, body, description }, joiSchema, joiOptions, (err) => {
      if (err) {
        // this regex replaces the string (\") that is returned with the json response
        const getErrorMessages = error => error.message.replace(/"/g, '');
        res.status(422).json({ message: err.details.map(getErrorMessages), });
      } else if (!err) {
        return next();
      }
    });
  }
}

export default ArticleValidations;
