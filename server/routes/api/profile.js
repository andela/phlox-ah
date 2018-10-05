import express from 'express';
import ProfileController from '../../controllers/profileController';
import upload from '../../helpers/cloudinary';
import Authenticator from '../../middlewares/authenticator';

const { checkToken } = Authenticator;
const router = express.Router();

router.post('/profile', checkToken, upload.single('profileImage'), ProfileController.createOrUpdateProfile);
router.put('/profile/:username', checkToken, upload.single('profileImage'), ProfileController.updateProfile);
router.get('/profile', checkToken, ProfileController.getProfile);
router.get('/profile/:username', checkToken, ProfileController.getProfileByUsername);
router.get('/profiles', checkToken, ProfileController.getProfiles);


export default router;
