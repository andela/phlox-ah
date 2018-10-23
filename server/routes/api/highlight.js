import express from 'express';
import Authenticator from '../../middlewares/authenticator';
import HighlightValidations from '../../middlewares/highlightValidations';
import HighlightController from '../../controllers/highlightController';

const { checkToken } = Authenticator;

const router = express.Router();
/* Highlight and comment Endpoint */
router.post('/articles/:articleSlug/highlight/comment', checkToken, HighlightValidations.validate, HighlightController.saveComment);
router.put('/articles/:articleSlug/highlight/comment/:highlightId/edit', checkToken, HighlightValidations.validate, HighlightController.editComment);
router.delete('/articles/:articleSlug/highlight/comment/:highlightId/delete', checkToken, HighlightController.deleteComment);

export default router;
