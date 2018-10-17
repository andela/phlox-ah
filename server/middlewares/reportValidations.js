import Joi from 'joi';
import checkJoiValidation from '../helpers/validations/checkJoiValidation';


export default (req, res, next) => {
  const joiSchema = {
    title: Joi.string().min(6).max(150).required(),
    body: Joi.string().min(10).required(),
  };
    // this tells Joi to proceed to check for all errors in user input before giving out a response
  const joiOptions = { abortEarly: false };
  const { title, body } = req.body;
  checkJoiValidation({ title, body }, joiSchema, joiOptions, res, next);
};
