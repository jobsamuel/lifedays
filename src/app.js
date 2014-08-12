// Public modules from npm.

var logfmt 	= require("logfmt");
var express = require('express');
var app 	= express();

app.use(logfmt.requestLogger());

// logfmt is key value logging convention adopted by Heroku.
// The library is for both converting lines in logfmt format to objects
// and for logging objects to a stream in logfmt format.

app.set('port', process.env.PORT || 8080);

// In many environments (e.g. Heroku), and as a convention, 
// you can set the environment variable PORT to tell your web server what port to listen on.
// So, 'process.env.PORT || 8080' means: whatever is in the environment variable PORT, 
// or 8080 if there's nothing there. 

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/vendor', express.static(__dirname + '/vendor'));
app.use('/partials', express.static(__dirname + '/partials'));

// Configure server to work when HTML5Mode is true

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendfile('index.html', { root: __dirname });
});

app.listen(app.set('port'));

console.log('Server running at http://127.0.0.1:8080/'); // Log valid in development environment only.