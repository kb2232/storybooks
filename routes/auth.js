var passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'],
		})
	);

	app.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
		res.redirect('/api/dashboard');
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};
