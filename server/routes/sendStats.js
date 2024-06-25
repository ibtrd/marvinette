const Profile = require("../mongo_models/Profile");
const Settings = require("../mongo_models/Settings");

module.exports = async function sendStats(req, res) {
    const poolYear = await Settings.getPoolYear();
    const poolMonth = await Settings.getPoolMonth();
    if (!poolMonth || !poolYear) {
        res.status(500).send();
    } else {
        const total = await Profile.getTotalSpins(poolYear, poolMonth);
        const Worms = await Profile.getCoalitionSpins('The Worms', poolYear, poolMonth);
        const Blobfishes = await Profile.getCoalitionSpins('The Blobfishes', poolYear, poolMonth);
        const Skunks = await Profile.getCoalitionSpins('The Skunks', poolYear, poolMonth);
        // const champion = Profile.find({ "champion?" === true})
        res.send({ 
            total: total, 
            theWorms: Worms, 
            theBlobfishes: Blobfishes, 
            theSkunks: Skunks
            // champion: champion;
        });
    }
}

