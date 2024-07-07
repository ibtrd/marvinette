const mongoose = require("mongoose");
const randGoal = require("../roulette/randGoal");
const { rouletteCells } = require("../roulette/rouletteCells");
const Rewards = require("./Rewards");
const Settings = require("./Settings");
const { piscineCoalitions } = require("../auth/config");
const ServerLogs = require("./ServerLogs");
const RandomPrizes = require("./RandomPrizes");

const profileSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  login: { type: String, required: true },
  img: {
    type: String,
    default: "https://profile.intra.42.fr/images/default.png",
  },
  cursusEnd: { type: Date },
  poolMonth: { type: String },
  poolYear: { type: Number },
  coalition: { type: String },
  coalitionId: { type: Number },
  coalitionUserId: { type: Number },
  coalitionImg: { type: String, default: "https://profile.intra.42.fr/images/default.png" },
  spins: { type: Number, default: 0 },
  lastSpin: { type: Number, default: 0 },
  "next?": { type: Number },
  "admin?": { type: Boolean, default: false },
});

profileSchema.statics.findByLogin = async function(login) {
  return await this.findOne({ login });
};

profileSchema.statics.getTotalSpins = async function (year, month) {
  const query = await this.find({ poolYear: year, poolMonth: month, "admin?": false });
  let total = 0;
  query.forEach((element) => {
    total += element.spins;
  });
  return total;
};

profileSchema.statics.getCoalitionSpins = async function (year, month) {
  const leaderboard = piscineCoalitions.map(async (coa) => {
    const query = await this.find({
      coalition: coa.name,
      poolYear: year,
      poolMonth: month,
      "admin?": false,
    })
    let spins = 0;
    query.forEach((entry) => {
      spins += entry.spins;
    });
    return ({ spins: spins, name: coa.name, img: coa.img, color: coa.color, background: coa.background })
  })
  return (await Promise.all(leaderboard)).sort((a, b) => b.spins - a.spins);
};

profileSchema.statics.getTopTen = async function(year, month) {
  const query = await this.find({
    poolYear: year,
    poolMonth: month,
    "admin?": false,
  }).sort({ spins: -1, lastSpin: 1 }).limit(10);
  const topTen = query.map((element) => {
    return {
      spins: element.spins,
      login: element.login,
      img: element.img,
      coaliton: element.coalition,
      coalitionImg: element.coalitionImg,
    };
  })
  return topTen;
}

profileSchema.methods.spin = async function(cells, index) {
  
  let goal;
  let forced = false;
  if (index >= 0 && index <= cells.length) {
    goal = index;
    forced = true;
  } else if (this["next?"] >= 0 && this["next?"] <= cells.length) {
    goal = this["next?"];
    forced = true;
    this["next?"] = undefined;
  } else if (this["next?"]) {
    goal = randGoal(rouletteCells.cells);
    this["next?"] = undefined;
  } else {
    goal = randGoal(rouletteCells.cells);
  }
  const cooldown = await Settings.getCooldown();
  this.lastSpin = Date.now();
  this.spins++;
  const spinReward = {
    img: cells[goal].img,
    alt: cells[goal].alt,
    description: cells[goal].description,
    particles: cells[goal].particles,
    color: cells[goal].color,
    nextSpin: this.lastSpin + (cooldown * 1000),
  }
  const regex = /^\[.*\]$/;
  if (regex.test(spinReward.description)) {
    const prize = await RandomPrizes.getOne(spinReward.description);
    spinReward.description = prize.description;
    spinReward.title = prize.title;
  }
  await this.save();
  const reward = await Rewards.addOne(this, cells[goal], forced, spinReward.img, spinReward.alt);
  ServerLogs.reward(this, reward, goal, cells[goal].name, forced);
  return { goal, ...spinReward};
};

profileSchema.methods.canSpin = function(cooldown) {
  return this.lastSpin + (parseInt(cooldown) * 1000) < Date.now();
};

profileSchema.methods.force = async function(index) {
  if (index === -1)
    this['next?'] = undefined;
  else
    this['next?'] = index;
  await this.save();
}

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
