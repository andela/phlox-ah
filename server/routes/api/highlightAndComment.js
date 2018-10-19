import express from 'express';
import Authenticator from '../../middlewares/authenticator';
import HighlightAndCommentValidations from '../../middlewares/highlightAndCommentValidations';
import HighlightAndCommentController from '../../controllers/highlightAndCommentController';

const { checkToken } = Authenticator;

const router = express.Router();
/* Highlight and comment Endpoint */
router.post('/articles/:articleSlug/highlight/comment', checkToken, HighlightAndCommentValidations.validate, HighlightAndCommentController.saveComment);
router.put('/articles/:articleSlug/highlight/comment/:highlightCommentId/edit', checkToken, HighlightAndCommentValidations.validate, HighlightAndCommentController.editComment);
router.delete('/articles/:articleSlug/highlight/comment/:highlightCommentId/delete', checkToken, HighlightAndCommentController.deleteComment);

export default router;
