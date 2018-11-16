import express from 'express';
import ArticleController from '../../controllers/articleController';
import RateController from '../../controllers/rateController';
import upload from '../../helpers/cloudinary';
import ArticleValidations from '../../middlewares/articleValidations';
import RateValidations from '../../middlewares/rateValidations';
import Authenticator from '../../middlewares/authenticator';
import LikeController from '../../controllers/likeController';
import SearchController from '../../controllers/searchController';
import CategoryController from '../../controllers/categoryController';
import permit from '../../middlewares/permission';

const { checkToken } = Authenticator;

const router = express.Router();
/* Article Endpoint */
router.post('/articles', checkToken, upload.single('imgUrl'), ArticleValidations.validateCreateArticle, ArticleController.createArticle);
router.get('/articles/preferences', checkToken, ArticleController.getArticleByPreference);
router.get('/articles/feed', ArticleController.getAllArticles);
router.get('/myarticles', checkToken, ArticleController.getUserArticles);
router.get('/myarticles/:status', checkToken, ArticleController.getUserArticles);
router.get('/categories', CategoryController.getAllCategories);
router.post('/categories', checkToken, permit('Admin'), CategoryController.createCategory);
router.get('/:categoryName/articles', CategoryController.getArticlesByCategory);
router.get('/articles/popular', ArticleController.popularArticles);
router.get('/articles/featured', ArticleController.featuredArticles);
router.get('/articles/:slug', ArticleController.getSingleArticle);
router.get('/articles/:status/:slug', checkToken, ArticleController.getSingleArticle);
router.delete('/articles/:slug', checkToken, ArticleController.deleteArticle);
router.put('/articles/:slug', checkToken, upload.single('imgUrl'), ArticleValidations.validateUpdateArticle, ArticleController.updateArticle);
router.post('/articles/:slug/rate', checkToken, RateValidations.validateRating, RateController.rateArticle);
router.post('/articles/:slug/like', checkToken, LikeController.likeArticle);
router.post('/articles/:slug/dislike', checkToken, LikeController.dislikeArticle);

router.get('/search', SearchController.searchWith);
export default router;
