import passport from 'passport';
import express from 'express';
import SocialLoginController from '../../controllers/socialLoginController';

const router = express.Router();

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
  '/login/facebook/return',
  passport.authenticate('facebook', { session: false }), SocialLoginController.respondWithToken
);

router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/login/google/return',
  passport.authenticate('google', { session: false }), SocialLoginController.respondWithToken
);

router.get('/login/twitter', passport.authenticate('twitter', { scope: ['include_email=true', 'include_entities=false'] }));

router.get(
  '/login/twitter/return',
  passport.authenticate('twitter', { session: false }), SocialLoginController.respondWithToken
);

// I added this route to test the response method in the SocialLoginController
router.post('/login/response', (req, res, next) => {
  req.user = req.body;
  next();
}, SocialLoginController.respondWithToken);

export default router;
