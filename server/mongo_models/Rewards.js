const mongoose = require("mongoose");
const fs = require('fs');

const rewardsSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  login: { type: String, required: true },
  coalition: { type: String, required: true },
  
  coalitionPoints: { type: String, default: "" },
  coalitionTo: { type: String, default: "" },
  coalitionFrom: { type: String, default: "" },

  evaluationPoint: { type: String, default: "" },
  intraTag: { type: String, default: "" },
  altarianDollar: { type: String, default: "" },
  peperotig: { type: String, default: "" },
  achievement: { type: String, default: "" },

  extracted: { type: Boolean, default: false },
});

rewardsSchema.statics.addOne = async function (profile, cell) {
  let reward = {
    timestamp: Date.now(),
    login: profile.login,
    coalition: profile.coalition,
    coalitionPoints: cell.reward.coalitionPoints,
    coalitionTo:
      cell.reward.coalitionTo === "user"
        ? profile.coalition
        : cell.reward.coalitionTo,
    coalitionFrom:
      cell.reward.coalitionTo === "user" || cell.reward.coalitionTo === profile.coalition
        ? profile.login
        : "",
    evaluationPoint: cell.reward.evaluationPoint,
    intraTag: cell.reward.intraTag,
    peperotig: cell.reward.peperotig,
    achievement: cell.reward.achievement,
  };
  await this.create(reward);
};

rewardsSchema.statics.extract = async function() {
  const rewards = await this.find({extracted: false});
  let extraction = [];
  rewards.forEach((reward) => {
    extraction.push([
      reward.timestamp,
      reward.login,
      reward.coalitionPoints,
      reward.coalitionTo,
      reward.coalitionFrom,
      reward.evaluationPoint,
      reward.intraTag,
      reward.altarianDollar,
      reward.peperotig,
      reward.achievement,
    ]);
    reward.extracted = true;
    reward.save();
  })
  return extraction;
};

const Rewards = mongoose.model("Rewards", rewardsSchema);

module.exports = Rewards;
