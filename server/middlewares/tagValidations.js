import Joi from 'joi';
/**
  * @class TagValidationsController
  * @description Validate User Input
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
    if (req.body.name) {
      const { name } = req.body;
      const joiSchema = {
        name: Joi.string().min(2).required()
      };
      // this tells Joi to check for all errors in user input before giving out a response
      const joiOptions = { abortEarly: false };
      Joi.validate({ name, }, joiSchema, joiOptions, (err) => {
        if (err) {
          // this regex replaces the string (\") that is returned with the json response
          const getErrorMessages = error => error.message.replace(/"/g, '');
          res.status(422).json({ message: err.details.map(getErrorMessages), status: 'failed', });
        } else if (!err) {
          return next();
        }
      });
    } else {
      res.status(400).json({ message: 'Bad Request', status: 'failed', });
    }
  }
}

export default TagValidations;
