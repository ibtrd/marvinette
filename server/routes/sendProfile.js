const Profile = require("../mongo_models/Profile")

module.exports = async function sendProfile(req, res) {
	const me = await Profile.findByLogin(req.session.user.login);
	if (me) {
		res.send({
			login: me.login,
			img: me.img,
			coalition: me.coalition,
			admin: me['admin?'],
		});
	} else {
		res.status(500).send();
	}
}
