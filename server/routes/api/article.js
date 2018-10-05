import express from 'express';
import ArticleController from '../../controllers/articleController';
import upload from '../../helpers/cloudinary';
import Authenticator from '../../middlewares/authenticator';

const { checkToken } = Authenticator;

const router = express.Router();
/* Article Endpoint */
router.post('/articles', checkToken, upload.single('imgUrl'), ArticleController.create);
router.get('/articles/feed', ArticleController.getAllArticles);
router.get('/articles', checkToken, ArticleController.getUserArticles);
router.get('/articles/:slug', checkToken, ArticleController.getSingle);
router.delete('/articles/:slug', checkToken, ArticleController.remove);
router.put('/articles/:slug', checkToken, upload.single('imgUrl'), ArticleController.update);

export default router;
