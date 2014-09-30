module.exports = function (app) {
	
	app.use(function (req, res, next) {
		// TODO
		res.send("Authentication failed!");
	});

	app.use(function (err, req, res, next) {
		// TODO
		res.status(501);
		console.log(err);
	});
}