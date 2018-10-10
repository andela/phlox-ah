import { Strategy as FacebookStrategy } from 'passport-facebook';
import socialLoginController from '../controllers/socialLoginController';

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.BASE_URL}/login/facebook/return`,
    profileFields: ['email', 'name', 'displayName'],
  },
  socialLoginController.passportCallback
);

export default facebookStrategy;
