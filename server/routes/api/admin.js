import express from 'express';
import AdminController from '../../controllers/adminController';
import RoleValidation from '../../middlewares/roleValidation';
import Authenticator from '../../middlewares/authenticator';
import permit from '../../middlewares/permission';

const { checkToken } = Authenticator;

const router = express.Router();

router.post('/admins/setRole', checkToken, permit('Admin'), RoleValidation.setRole, AdminController.changeRole);

export default router;
