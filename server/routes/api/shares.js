import express from 'express';
import SharesController from '../../controllers/sharesController';
import Authenticator from '../../middlewares/authenticator';

const { checkToken } = Authenticator;
const router = express.Router();

router.get('/share/:articleSlug', checkToken, SharesController.getArticleShares);
router.post('/share/:articleSlug', checkToken, SharesController.shareArticle);

export default router;
