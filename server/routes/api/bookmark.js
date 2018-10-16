import express from 'express';
import Authenticator from '../../middlewares/authenticator';
import BookmarkValidations from '../../middlewares/bookmarkValidations';
import BookmarkController from '../../controllers/bookmarkController';

const { checkToken } = Authenticator;

const router = express.Router();
/* Bookmark Endpoint */
router.get('/bookmarks', checkToken, BookmarkController.showBookmarks);
router.post('/bookmarks', checkToken, BookmarkValidations.validateBookmark, BookmarkController.addBookmark);
router.delete('/bookmarks', checkToken, BookmarkValidations.validateBookmark, BookmarkController.deleteBookmark);

export default router;
