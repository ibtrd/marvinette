const mongoose = require("mongoose");
const { piscineCoalitions } = require("../auth/config");

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

rewardsSchema.statics.getTotalTig = async function (year, month, from, to) {
  const query = await this.find({
    peperotig: "1",
    timestamp: { $gt: from, $lt: to },
  }).populate("profile");
  let total = 0;
  query.forEach((entry) => {
    if (entry.profile.poolYear === year && entry.profile.poolMonth === month)
      total += 1;
  });
  return total;
};

rewardsSchema.statics.getTotalSpins = async function (year, month, from, to) {
  const query = await this.find({
    timestamp: { $gt: from, $lt: to },
  }).populate("profile");
  if (query.length === 0)
    return 0;
  let total = 0;
  query.forEach((entry) => {
    if (entry.profile.poolYear === year && entry.profile.poolMonth === month)
      total += 1;
  });
  return total;
};

rewardsSchema.statics.getTotalAchievement = async function (year, month, from, to) {
  const query = await this.find({
    achievement: "1",
    timestamp: { $gt: from, $lt: to },
  }).populate("profile");
  let total = 0;
  query.forEach((entry) => {
    if (entry.profile.poolYear === year && entry.profile.poolMonth === month)
      total += 1;
  });
  return total;
};

rewardsSchema.statics.getTotalAltarian = async function (year,month, from, to) {
  const query = await this.find({
    altarianDollar: "1",
    timestamp: { $gt: from, $lt: to },
  }).populate("profile");
  let total = 0;
  query.forEach((entry) => {
    if (entry.profile.poolYear === year && entry.profile.poolMonth === month)
      total += 1;
  });
  return total;
};

rewardsSchema.statics.getTotalEvalPts = async function (year, month, from, to) {
  const query = await this.find({
    evaluationPoint: { $ne: "" },
    timestamp: { $gt: from, $lt: to },
  }).populate("profile");
  let gain = 0;
  let loss = 0;
  query.forEach((entry) => {
    if (entry.profile.poolYear === year && entry.profile.poolMonth === month) {
      if (entry.evaluationPoint === "1") {
        gain += 1;
      } else if (entry.evaluationPoint === "-1") {
        loss += 1;
      }
    }
  });
  return { gain, loss };
};

rewardsSchema.statics.getTotalCoaPts = async function (year, month, from, to) {
  let query = await this.find({
    timestamp: { $gt: from, $lt: to },
  }).populate("profile");
  const coalitions = piscineCoalitions.map((coa) => {
    return {
      name: coa.name,
      id: coa.id,
      spins: query.filter((reward) => (reward.profile.coalitionId === coa.id)).length,
      special: 0, 
      tig: 0,
      members: { gain: 0, loss: 0 },
      total: 0,
    };
  })
  query.forEach((entry) => {
    if (entry.profile.poolYear === year && entry.profile.poolMonth === month && entry.coalitionPoints !== "") {
      const coa = coalitions.find(coa => coa.id === parseInt(entry.coalitionTo));
      const value = parseInt(entry.coalitionPoints);
      if (entry.coalitionFrom === "") {
        coa.special += value;
      } else if (value > 0) {
        coa.members.gain += value;
      } else if (value < 0) {
        coa.members.loss += value;
      }
    }
  });
  query = await this.find({
    peperotig: "1",
    timestamp: { $gt: from, $lt: to },
  }).populate("profile");
  query.forEach(entry => {
    if (entry.profile.poolYear === year && entry.profile.poolMonth === month) {
      const coa = coalitions.find(coa => coa.id === entry.profile.coalitionId);
      coa.tig -= 42;
    }
  })
  coalitions.forEach(coa => {
    coa.total = coa.special + coa.tig + coa.members.gain + coa.members.loss
  })
  coalitions.forEach((coa) => delete coa.id);
  return coalitions;
}

rewardsSchema.statics.getLastRewards = async function (year, month) {
  const query = await this.find({ timestamp: { $lt: Date.now() - 20000 } })
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
      cell.reward.coalitionTo === "user" ? profile.coalitionId : cell.reward.coalitionTo,
    coalitionFrom:
      cell.reward.coalitionTo === "user" ? profile.coalitionUserId : "",
    evaluationPoint: cell.reward.evaluationPoint,
    intraTag: cell.reward.intraTag,
    altarianDollar: cell.reward.altarianDollar,
    peperotig: cell.reward.peperotig,
    achievement: cell.reward.achievement,
    forced: forced,
    extracted: cell.reward.intraLog === 'FALSE'
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
      reward.profile.id,
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
