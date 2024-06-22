const mongoose = require("mongoose");
const fs = require('fs');

const rewardsSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  login: { type: String, required: true },
  coalitionPoints: { type: Number, default: 0 },
  coalitionName: { type: String, default: null},
  selfCoalition: { type: Boolean, default: false},
  description: { type: String, default: null },
  evaluationPoint: { type: Number, default: 0 },
  intraTag: { type: Boolean, default: false },
  peperotig: { type: Boolean, default: false },
  altarianDollar: { type: Boolean, default: false },
  achievement: { type: Boolean, default: false },
  extracted: { type: Boolean, default: false },
});

rewardsSchema.statics.extract = async function() {
  const rewards = await this.find({extracted: false});
  let extraction = [];
  rewards.forEach((reward) => {
    extraction.push([
      reward.timestamp,
      reward.login,
      reward.coalitionPoints,
      reward.coalitionName
    ]);
    reward.extracted = true;
    reward.save();
  })
  console.log('EXTRACTED REWARDS', extraction);
  // fs.writeFile(Date.now().toString(), extraction);
  return extraction;
};

rewardsSchema.statics.addOne = async function (profile, cell) {
  await this.create({
    timestamp: Date.now(),
    login: profile.login,
    coalitionPoints: 5,
  });
};

const Rewards = mongoose.model("Rewards", rewardsSchema);

module.exports = Rewards;
