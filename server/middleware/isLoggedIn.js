function isLoggedIn(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		return res.redirect('/login')
	}
}

function isLoggedOut(req, res, next) {
	if (req.session.user) {
		res.redirect('/');
	} else {
		next();
	}
}

module.exports = { isLoggedIn, isLoggedOut };