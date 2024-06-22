const Rewards = require("../mongo_models/Rewards");

module.exports = async function sendRewards(req, res) {
  const rewards = await Rewards.extract();
  if (rewards) {
    res.send(rewards);
  } else {
    res.status(500).send();
  }
};
