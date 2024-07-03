const Profile = require("../mongo_models/Profile");
const Rewards = require("../mongo_models/Rewards");
const Settings = require("../mongo_models/Settings");

module.exports = async function sendProfile(req, res) {
	const me = await Profile.findByLogin(req.session.user.login);
	const cooldown = await Settings.findByKey('cooldown');
	const poolYear = await Settings.getPoolYear();
    const poolMonth = await Settings.getPoolMonth();
	if (me && cooldown && poolYear && poolMonth) {
		const totalSpins = await Profile.getTotalSpins(poolYear, poolMonth);
		const champion = await Rewards.getCurrentChampion(poolYear, poolMonth);
		res.send({
			login: me.login,
			img: me.img,
			coalition: me.coalition,
			nextSpin: me.lastSpin + (parseInt(cooldown.value) * 1000),
			admin: me['admin?'],
			totalSpins,
			champion: champion ? {
                login: champion.login,
                img: champion.img
            } : null,
		});
	} else {
		res.status(500).send();
	}
}
