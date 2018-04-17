var passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'],
		})
	);

	app.get('/api/dashboard',(req, res) => {
		res.render('index/dashboard');
	});

	app.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
		res.redirect('/api/dashboard');
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		//show that you are no longer signed in
		res.send(req.user);
	});
};
