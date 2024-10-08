const Profile = require("../mongo_models/Profile");

module.exports = async function isAdmin(req, res, next) {
	if (!req.session.user) {
		return res.status(401).send();
	}
	const profile = await Profile.findByLogin(req.session.user.login);
	if (profile && profile['admin?'] === true) {
		next()
	} else {
		return res.status(403).send();
	}
}