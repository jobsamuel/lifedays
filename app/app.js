var express = require('express')
,	session = require('express-session')
,	passport = require('passport')
,	logfmt = require('logfmt')
,	swig = require('swig')
,	router = require('./routes/router')
,	errorHandler = require('./routes/errorHandler')
,	app = express();

// In many environments (e.g. Heroku), and as a convention, 
// you can set the environment variable PORT to tell your web server what port to listen on.
// So, 'process.env.PORT || 3000' means: whatever is in the environment variable PORT, 
// or 3000 if there's nothing there.
app.set('port', process.env.PORT || 3000);

// logfmt is key value logging convention adopted by Heroku.
// The library is for both converting lines in logfmt format to objects
// and for logging objects to a stream in logfmt format.
app.use(logfmt.requestLogger());

// Session configuration.
app.use(session({ secret: 'pass', /*cookie: { maxAge: 3600000 },*/ resave: true, saveUninitialized: true }));

// Passport initialization.
app.use(passport.initialize());
app.use(passport.session());

// Swig configuration.
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Routes.
app.use('/', router);

// Error handler.
//errorHandler(app);

// The server.
app.listen(app.set('port'), function () {
	console.log("App listening on port " + app.set('port'));
});



