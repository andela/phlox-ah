import express from 'express';
import AdminController from '../../controllers/adminController';
import RoleValidation from '../../middlewares/roleValidation';
import Authenticator from '../../middlewares/authenticator';
import permit from '../../middlewares/permission';
import ArticleController from '../../controllers/articleController';

const { checkToken } = Authenticator;

const router = express.Router();

router.post('/admins/role', checkToken, permit('Admin'), RoleValidation.setRole, AdminController.changeRole);
router.delete('/admins/articles/:slug/reports', checkToken, permit('Admin'), ArticleController.deleteReportedArticle);

export default router;
