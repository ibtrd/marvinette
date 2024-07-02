const Profile = require("../mongo_models/Profile");
const Settings = require("../mongo_models/Settings");

module.exports = async function sendProfile(req, res) {
	const cooldown = await Settings.findByKey('cooldown');
	const me = await Profile.findByLogin(req.session.user.login);
	if (me && cooldown) {
		res.send({
			login: me.login,
			img: me.img,
			coalition: me.coalition,
			nextSpin: me.lastSpin + (parseInt(cooldown.value) * 1000),
			admin: me['admin?'],
		});
	} else {
		res.status(500).send();
	}
}
