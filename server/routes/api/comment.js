import express from 'express';
import CommentController from '../../controllers/commentController';
import Authenticator from '../../middlewares/authenticator';
import CommentValidations from '../../middlewares/commentValidations';

const router = express.Router();

const { checkToken } = Authenticator;

const { isValidData } = CommentValidations;

router.post('/articles/:articleSlug/comments', checkToken, isValidData, CommentController.createArticleComment);

router.get('/articles/:articleSlug/comments', checkToken, CommentController.getArticleComment);

router.post('/articles/:articleSlug/comments/:commentId/reply', checkToken, isValidData, CommentController.replyArticleComment);

router.put('/articles/:articleSlug/comments/:commentId/edit', checkToken, isValidData, CommentController.editArticleComment);

router.put('/articles/:articleSlug/comments/:commentId/reply/:replyCommentId/edit', checkToken, isValidData, CommentController.editReplyArticleComment);



export default router;

