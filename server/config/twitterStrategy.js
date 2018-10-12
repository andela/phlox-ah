import { Strategy as TwitterStrategy } from 'passport-twitter';
import socialLoginController from '../controllers/socialLoginController';

// create an instance of Twitter Strategy
const twitterStrategy = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    callbackURL: `${process.env.TWITTER_BASE_URL}/login/twitter/return`,
    includeEmail: true
  },
  socialLoginController.passportCallback
);

export default twitterStrategy;
