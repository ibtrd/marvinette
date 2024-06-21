module.exports = function isLoggedIn(req, res, next){
	if (req.session.user) {
		next();
	} else {
		return res.redirect('/login')
	}
}