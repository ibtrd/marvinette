const Settings = require("../mongo_models/Settings");

module.exports = async function isLoggedIn(req, res, next) {
	const status = await Settings.findByKey('gameStatus');
	if (!status || status.value != 'active') {
		return res.redirect('/login'); //Add inactive game page redirection
	} if (req.session.user) {
		next();
	} else {
		return res.redirect('/login')
	}
}