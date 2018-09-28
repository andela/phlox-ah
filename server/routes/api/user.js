import express from "express"
import UserController  from '../../controllers/userController';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => res.json('welcome Author Haven'));

/* User Endpoint */
router.post('/signup', UserController.create);


export default router;

