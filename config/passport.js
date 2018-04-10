var passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy;
  var mongoose = require('mongoose'),
  keys = require('./keys');

/*I want to be able to autheticate users with GoogleStrategy(argument-1, argument-2);
only after we PASS the first argument is done do we handle the second argument
*/
var authenticateUser = new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy:true
  },(accessToken, refreshToken, profile, done)=>{
    console.log(profile);
  }
);
passport.use(authenticateUser);
