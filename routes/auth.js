var passport = require('passport');

var { ensureAuthenticated } = require('./helper');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'],
		})
	);

	app.get('/api/dashboard', ensureAuthenticated, (req, res) => {
		res.send({ hi: 'authenticated!!!' });
	});

	app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
		res.redirect('/api/dashboard');
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		//show that you are no longer signed in
		res.send(req.user);
	});
};
