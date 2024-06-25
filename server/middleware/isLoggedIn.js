const Settings = require("../mongo_models/Settings");

module.exports = function isLoggedIn(req, res, next) {
	const status = Settings.findByKey('gameStatus');
	if (status != 'active') {
		return res.redirect('/login'); //Add inactive game page redirection
	} if (req.session.user) {
		next();
	} else {
		return res.redirect('/login')
	}
}