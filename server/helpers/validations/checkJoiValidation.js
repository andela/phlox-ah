import Joi from 'joi';

const checkJoiValidation = (input, joiSchema, joiOptions, res, next) => {
  Joi.validate(input, joiSchema, joiOptions, (err) => {
    if (err) {
      // this regex replaces the string (\") that is returned with the json response
      const getErrorMessages = error => error.message.replace(/"/g, '');
      res.status(422).json({ message: err.details.map(getErrorMessages), status: 'failed', });
    } else if (!err) {
      return next();
    }
  });
};

export default checkJoiValidation;
