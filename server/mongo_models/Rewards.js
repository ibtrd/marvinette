const mongoose = require("mongoose");

const rewardsSchema = new mongoose.Schema({
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  timestamp: { type: Date, required: true },
  img: {
    type: String,
    default: "https://profile.intra.42.fr/images/default.png",
  },
  alt: { type: String },

  coalitionPoints: { type: String, default: "" },
  coalitionTo: { type: String, default: "" },
  coalitionFrom: { type: String, default: "" },
  evaluationPoint: { type: String, default: "" },
  intraTag: { type: String, default: "" },
  altarianDollar: { type: String, default: "" },
  peperotig: { type: String, default: "" },
  achievement: { type: String, default: "" },

  forced: { type: Boolean },
  extracted: { type: Boolean, default: false },
  logged: { type: Boolean, default: false },
});

rewardsSchema.statics.getCurrentChampion = async function (year, month) {
  const champions = await this.find({ intraTag: '1' })
  .populate('profile')
  .sort({ timestamp: -1 });
  for (let i = 0; i < champions.length; i++) {
    const document = champions[i];
    if (document.profile.poolYear === year && document.profile.poolMonth === month && document.profile['admin?'] === false)
      return document.profile;
  }
  return null
}

rewardsSchema.statics.getLastRewards = async function (year, month) {
  const query = await this.find({ timestamp: { $lt: Date.now() - 20000 }})
  .populate('profile')
  .sort({ timestamp: -1 })
  .limit(20);
  const lastRewards = query.map( entry => {
    return ({ login: entry.profile.login, img: entry.profile.img, reward: entry.img, alt: entry.alt });
  });
  return lastRewards;
}

rewardsSchema.statics.addOne = async function (profile, cell, forced, img, alt) {
  if (profile['admin?'] === true)
    return ;
  let reward = {
    profile: profile,
    timestamp: Date.now(),
    img,
    alt,
    coalitionPoints: cell.reward.coalitionPoints,
    coalitionTo:
      cell.reward.coalitionTo === "user"
        ? profile.coalition
        : cell.reward.coalitionTo,
    coalitionFrom:
      cell.reward.coalitionTo === "user"
        ? profile.login
        : "",
    evaluationPoint: cell.reward.evaluationPoint,
    intraTag: cell.reward.intraTag,
    altarianDollar: cell.reward.altarianDollar,
    peperotig: cell.reward.peperotig,
    achievement: cell.reward.achievement,
    forced: forced,
  };
  await this.create(reward);
};

rewardsSchema.statics.extract = async function(action) {
  let rewards;
  if (action === 'intra') {
    rewards = await this.find({extracted: false}).populate('profile');
  } else if (action === 'log') {
    rewards = await this.find({logged: false}).populate('profile');
  }
  let extraction = [];
  rewards.forEach((reward) => {
    extraction.push([
      reward.timestamp,
      reward.profile.login,
      reward.coalitionPoints,
      reward.coalitionTo,
      reward.coalitionFrom,
      reward.evaluationPoint,
      reward.intraTag,
      reward.altarianDollar,
      reward.peperotig,
      reward.achievement,
      reward.forced ? "true" : "",
    ]);
  if (action === 'intra') {
    reward.extracted = true;
  } else if (action === 'log') {
    reward.logged = true;
  }
    reward.save();
  })
  return extraction;
};

const Rewards = mongoose.model("Rewards", rewardsSchema);

module.exports = Rewards;
