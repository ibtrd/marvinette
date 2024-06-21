const Profile = require("../mongo_models/Profile");
const isLoggedIn = require("./isLoggedIn");

module.exports = async function isAdmin(req, res, next) {
	if (!req.session.user) {
		return (res.status(401 ).send('Unauthorized'));
	}
	const profile = await Profile.findByLogin(req.session.user.login);
	if (profile && profile['admin?'] === true) {
		next()
	} else {
		return res.status(403).send('Forbidden');
	}
}