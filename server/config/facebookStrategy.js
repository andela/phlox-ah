import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import socialLoginController from '../controllers/socialLoginController';


const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/api/v1/login/facebook/return',
    profileFields: ['email', 'name', 'displayName'],
  },
  socialLoginController.passportCallback
);
passport.use(facebookStrategy);


export default facebookStrategy;
