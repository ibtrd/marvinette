module.exports = function isLoggedIn(req, res, next){
	console.log('middlware')
	if (req.session.user) {
		return next()
	} else {
		return res.redirect('/login')
	}
}