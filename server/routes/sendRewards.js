const Rewards = require("../mongo_models/Rewards");

module.exports = async function sendRewards(req, res) {
  if (req.params.secret == process.env.REWARDINTRA_SECRET) {
    const rewards = await Rewards.extract('intra');
    if (rewards) {
      res.send(rewards);
    } else {
      res.status(500).send();
    }
  } else if (req.params.secret == process.env.REWARDLOG_SECRET) {
    const rewards = await Rewards.extract('log');
    if (rewards) {
      res.send(rewards);
    } else {
      res.status(500).send();
    }
  } else {
    res.status(403).send();
  }
};
