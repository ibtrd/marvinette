module.exports = function isLoggedIn(req, res, next){
	if (req.session.user) {
		return next()
	} else {
		return res.redirect('/login')
	}
}