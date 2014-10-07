var express = require('express')
,	moment = require('moment')
,	router = express.Router();

// Moment configuration.
// TODO

// Router middleware configuration.
router.use(function (req, res, next) {
	console.log(req.method, req.url);
	next();
});

// Routes configuration.
router.get('/', function (req, res) {
	res.render('index', { name: "stranger" });
});

module.exports = router;