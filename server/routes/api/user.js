import express from 'express';
import UserController from '../../controllers/userController';
import Authenticator from '../../middlewares/authenticator';
import UserValidations from '../../middlewares/userValidations';

const { checkToken } = Authenticator;

const router = express.Router();

/* eslint-disable no-unused-vars */
/* GET home page. */
router.get('/', (req, res, next) => res.json('welcome Author Haven'));

/* User Endpoint */
router.post('/signup', UserValidations.validateSignup, UserController.create);
router.post('/forget', UserController.forgetPassword);
router.put('/reset_password/:token', UserController.resetPassword);

/* Test route */
router.get('/test', checkToken, (req, res) => res.status(200).json('This is a protected route'));
export default router;
