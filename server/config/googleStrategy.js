import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import socialLoginController from '../controllers/socialLoginController';

// create an instance of Google strategy
const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: 'http://localhost:3000/api/v1/login/google/return',
  },
  socialLoginController.passportCallback
);

export default googleStrategy;
