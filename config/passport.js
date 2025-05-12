const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userService = require('../services/UserService');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await userService.getUserByEmail(profile.emails[0].value);
      if (!user) {
        user = await userService.createUser({
          google_id: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
        });
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
