var passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy;
var mongoose = require('mongoose'),
  keys = require('./keys');

var User = mongoose.model('usersCollection');

passport.serializeUser((newuser, done) => {
	//newuser is what is returned by the promise below
	//'done' is a callback
	done(null, newuser.id);
	/*newuser.id IS NOT the profile.id from google.
	it is the _id that mongo generates to each collection. We cannot assume that every user has a google id so mongo creates a unique mongo _id to each user. This id is then set as the cookie, and sent to browser
	*/
});

passport.deserializeUser((id, done) => {
	//id = is the same thing as the newuser.id from the serializeUser()
	// we find that user in the database, return it with newuser, then call done()
	User.findById(id).then(newuser => {
		done(null, newuser);
	});
});

var authenticateUser = new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy:true
  },
  async (accessToken, refreshToken, profile, done)=>
  {
    var existingUser = await User.findOne({googleID:profile.id});
    if(existingUser)
      return done(null,existingUser);
    var newuser = await new User({googleID:profile.id}).save();
    done(null,newuser);
  }
);
passport.use(authenticateUser);

