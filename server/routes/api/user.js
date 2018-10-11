import express from 'express';
import UserController from '../../controllers/userController';
import Authenticator from '../../middlewares/authenticator';
import UserValidations from '../../middlewares/userValidations';

const { checkToken } = Authenticator;

const router = express.Router();

/* eslint-disable no-unused-vars */
/* GET home page. */
router.get('/', (req, res) => res.json('welcome Author Haven'));

/* User Endpoint */
router.post('/signup', UserValidations.validateSignup, UserController.create);
router.post('/forgetPassword', UserController.forgetPassword);
router.put('/reset_password/:token', UserController.resetPassword);

router.post('/login', UserValidations.validateLogin, UserController.login);

router.get('/users/verify/:verifyToken', UserController.verifyUser);
router.post('/profiles/:username/follow', checkToken, UserController.followUser);
router.delete('/profiles/:username/follow', checkToken, UserController.unfollowUser);
router.get('/followings', checkToken, UserController.followList);


/* Test route */
router.get('/test', checkToken, (req, res) => res.status(200).json('This is a protected route'));
export default router;
