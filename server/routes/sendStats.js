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
        const worms = await Profile.getCoalitionSpins('The Worms', poolYear, poolMonth);
        const blobfishes = await Profile.getCoalitionSpins('The Blobfishes', poolYear, poolMonth);
        const skunks = await Profile.getCoalitionSpins('The Skunks', poolYear, poolMonth);
        const champion = await Rewards.getCurrentChampion(poolYear, poolMonth);
        res.send({ 
            total: total, 
            theWorms: worms, 
            theBlobfishes: blobfishes, 
            theSkunks: skunks,
            champion: champion ? {
                login: champion.login,
                img: champion.img
            } : null,
        });
    }
}