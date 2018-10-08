import express from 'express';
import ArticleController from '../../controllers/articleController';
import upload from '../../helpers/cloudinary';
import ArticleValidations from '../../middlewares/articleValidations';
import Authenticator from '../../middlewares/authenticator';

const { checkToken } = Authenticator;

const router = express.Router();
/* Article Endpoint */
router.post('/articles', checkToken, upload.single('imgUrl'), ArticleValidations.validateCreateArticle, ArticleController.createArticle);
router.get('/articles/feed', ArticleController.getAllArticles);
router.get('/articles', checkToken, ArticleController.getUserArticles);
router.get('/articles/:slug', checkToken, ArticleController.getSingleArticle);
router.delete('/articles/:slug', checkToken, ArticleController.deleteArticle);
router.put('/articles/:slug', checkToken, upload.single('imgUrl'), ArticleValidations.validateUpdateArticle, ArticleController.updateArticle);

export default router;