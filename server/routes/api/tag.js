import express from 'express';
// import ArticleController from '../../controllers/articleController';
import Authenticator from '../../middlewares/authenticator';

const { checkToken } = Authenticator;

const router = express.Router();
/* Tag Endpoint */
router.post('/tags', checkToken);

export default router;
