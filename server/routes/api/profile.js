import express from "express"
import UserController  from '../../controllers/userController';
import ProfileController  from '../../controllers/profileController';
import { profileExist } from '../../helps/profile';
import upload from "../../helps/cloudinary";
import Authenticator from '../../middlewares/authenticator';

const { checkToken } = Authenticator;
const router = express.Router();


router.post('/profile/create-update',
  checkToken, 
  upload.single('profileImage'),
  ProfileController.createOrUpdate
);

router.get('/profile', 
  checkToken, 
  ProfileController.getAll
);


export default router;
