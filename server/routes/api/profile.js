import express from 'express';
import ProfileController from '../../controllers/profileController';
import upload from '../../helpers/cloudinary';
import Authenticator from '../../middlewares/authenticator';

const { checkToken } = Authenticator;
const router = express.Router();


router.post('/profile', checkToken, upload.single('profileImage'), ProfileController.createOrUpdate);

router.put('/profile/:id', checkToken, upload.single('profileImage'), ProfileController.update);

router.get('/profile', checkToken, ProfileController.getOne);

router.get('/profile/:id', checkToken, ProfileController.get);

router.get('/profiles', checkToken, ProfileController.getAll);


export default router;
