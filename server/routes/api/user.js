import express from 'express';
import UserController from '../../controllers/userController';
import Authenticator from '../../middlewares/authenticator';

const { checkToken } = Authenticator;

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => res.json('welcome Author Haven'));

/* User Endpoint */
router.post('/signup', UserController.create);

/* Test route */
router.get('/test', checkToken, (req, res) => res.json('Test Route'));
export default router;
