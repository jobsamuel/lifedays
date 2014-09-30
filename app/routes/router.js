var express = require('express')
,	moment = require('moment')
,	passport = require('passport')
,	facebook = require('./../config/passport')
,	router = express.Router();

// Passport configuration.
facebook(passport);

// Moment configuration.
// TODO

// Router middleware configuration.
router.use(function (req, res, next) {
	console.log(req.method, req.url);
	next();
});

// Routes configuration.
router.get('/', function (req, res) {
	if (req.user == null) {
		res.render('index', { name: "stranger", session: "Login", link: "/login" });	
	} else {
		res.render('index', { name: req.user.name, photo: req.user.photo, session: "Logout", link: "/logout" });
	}
});

// Log In.
router.get('/login', function (req, res, next) {

	// Custom authentication request.
	passport.authenticate('facebook', function (err, user, info) {
		if (err) {
			return next(err);
		} else if (!user) {
			return next();
		} else {
			console.log(user);
			console.log(info);
			req.login(user, function(err) {
		      if (err) { 
		      	return next(err); 
		      }
		      	return res.redirect('/');
		    });
		}
	})(req, res, next);
});

// Log Out.
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;