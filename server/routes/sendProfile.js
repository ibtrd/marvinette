const Profile = require("../mongo_models/Profile");
const Rewards = require("../mongo_models/Rewards");
const Settings = require("../mongo_models/Settings");

module.exports = async function sendProfile(req, res) {
	const [me, cooldown, poolYear, poolMonth, statusTimeout] = await Promise.all([
    	Profile.findByLogin(req.session.user.login),
    	Settings.getCooldown(),
    	Settings.getPoolYear(),
    	Settings.getPoolMonth(),
		Settings.getStatusTimeout(),
  ]);
	if (me) {
		const totalSpins = await Profile.getTotalSpins(poolYear, poolMonth);
		const champion = await Rewards.getCurrentChampion(poolYear, poolMonth);
		res.send({
			login: me.login,
			img: me.img,
			coalition: me.coalition,
			nextSpin: me.lastSpin + (cooldown * 1000),
			admin: me['admin?'],
			totalSpins,
			champion: champion ? {
                login: champion.login,
                img: champion.img
            } : null,
			statusTimeout: statusTimeout !== "-1" ? statusTimeout : null,
		});
	} else {
		res.status(500).send();
	}
}
