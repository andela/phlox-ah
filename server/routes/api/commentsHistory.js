import express from 'express';
import CommentsHistoryController from '../../controllers/commentHistoryController';
import Authenticator from '../../middlewares/authenticator';

const router = express.Router();

const { checkToken } = Authenticator;

router.get('/articles/:articleSlug/comments/:commentId/myhistory', checkToken, CommentsHistoryController.getMyCommentHistory);
router.get('/articles/:articleSlug/comments/:commentId/allhistory', checkToken, CommentsHistoryController.getAllCommentHistory);

export default router;
