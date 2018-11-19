import express from 'express';
import CommentController from '../../controllers/commentController';
import LikeCommentController from '../../controllers/likeCommentController';
import LikeReplyController from '../../controllers/likeReplyController';
import Authenticator from '../../middlewares/authenticator';
import CommentValidations from '../../middlewares/commentValidations';

const router = express.Router();

const { checkToken } = Authenticator;

const { isValidData } = CommentValidations;

router.post('/articles/:articleSlug/comments', checkToken, isValidData, CommentController.createArticleComment);

router.get('/articles/:articleSlug/comments', CommentController.getArticleComment);

router.post('/articles/:articleSlug/comments/:commentId/reply', checkToken, isValidData, CommentController.replyArticleComment);

router.put('/articles/:articleSlug/comments/:commentId/reply/:replyCommentId/edit', checkToken, isValidData, CommentController.editReplyArticleComment);

router.put('/articles/:articleSlug/comments/:commentId/edit', checkToken, isValidData, CommentController.editArticleComment);

router.post('/articles/:articleSlug/comments/:commentId/like', checkToken, LikeCommentController.likeComment);

router.post('/articles/:articleSlug/comments/:commentId/dislike', checkToken, LikeCommentController.dislikeComment);

router.post('/articles/:articleSlug/comments/:commentId/reply/:replyId/like', checkToken, LikeReplyController.likeReply);

router.post('/articles/:articleSlug/comments/:commentId/reply/:replyId/dislike', checkToken, LikeReplyController.dislikeReply);


export default router;
