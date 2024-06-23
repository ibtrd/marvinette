const Profile = require("../mongo_models/Profile");
const Settings = require("../mongo_models/Settings");

module.exports = async function sendStats(req, res) {
    const poolYear = await Settings.getPoolYear();
    const poolMonth = await Settings.getPoolMonth();
    console.log (poolMonth, poolYear);
    if (!poolMonth || !poolYear) {
        res.status(500).send();
    } else {
        const total = Profile.getTotalSpins(poolYear, poolMonth);
        const Worms = Profile.getCoalitionSpins('The Worms', poolYear, poolMonth);
        const Blobfishes = Profile.getCoalitionSpins('The Blobfishes', poolYear, poolMonth);
        const Skunks = Profile.getCoalitionSpins('The Skunks', poolYear, poolMonth);
        // const champion = Profile.find({ "champion?" === true})
        res.send({ 
            total: await total, 
            theWorms: await Worms, 
            theBlobfishes: await Blobfishes, 
            theSkunks: await Skunks
            // champion: champion;
        });
    }
}

