import express from 'express';
import TagValidations from '../../middlewares/tagValidations';
import Authenticator from '../../middlewares/authenticator';
import TagController from '../../controllers/tagController';

const { checkToken } = Authenticator;

const router = express.Router();
/* Tag Endpoint */
router.get('/tags', checkToken, TagController.showAllTags);
router.get('/tags/:name', checkToken, TagController.showOneTag);
router.post('/tags', checkToken, TagValidations.validateTag, TagController.createTag);
router.delete('/tags/:name', checkToken, TagController.deleteTag);

export default router;
