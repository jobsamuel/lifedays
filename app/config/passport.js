var Facebook = require('passport-facebook').Strategy
,   token = require('./token')
,   config = {
                clientID: token.facebookKey,
                clientSecret: token.facebookSecret,
                callbackURL: "/login"
    }

// Passport callback setup.
function callback(token, tokenSecret, profile, done) {
	var user = {name: profile.displayName, gender: profile.gender};
	done(null, user);
}

// Passport session setup.
function passport(passport) {

	// To support persistent login sessions, Passport needs to be able to
	// serialize users into and deserialize users out of the session.  Typically,
	// this will be as simple as storing the user ID when serializing, and finding
	// the user by ID when deserializing.  However, since this app does not
	// have a database of user records, the complete Facebook profile is serialized
	// and deserialized.
  	passport.serializeUser(function(user, done) {
    	done(null, user);
  	});

  	passport.deserializeUser(function(obj, done) {
    	done(null, obj);
  	});

  	passport.use(new Facebook(config, callback));
}

module.exports = passport;
