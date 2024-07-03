const Profile = require("../mongo_models/Profile");
const Rewards = require("../mongo_models/Rewards");
const Settings = require("../mongo_models/Settings");

module.exports = async function sendStats(req, res) {
    const poolYear = await Settings.getPoolYear();
    const poolMonth = await Settings.getPoolMonth();
    if (!poolMonth || !poolYear) {
        res.status(500).send();
    } else {
        const total = await Profile.getTotalSpins(poolYear, poolMonth);
        const coalitions = await Profile.getCoalitionSpins(poolYear, poolMonth);
        const champion = await Rewards.getCurrentChampion(poolYear, poolMonth);
        const topTen = await Profile.getTopTen(poolYear, poolMonth);
        const lastRewards = await Rewards.getLastRewards(poolYear, poolMonth);
        res.send({ 
            total, 
            coalitions,
            champion: champion ? {
                login: champion.login,
                img: champion.img
            } : null,
            topTen,
            lastRewards,
        });
    }
}
