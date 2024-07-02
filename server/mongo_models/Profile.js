const mongoose = require("mongoose");
const randGoal = require("../roulette/randGoal");
const { rouletteCells } = require("../roulette/rouletteCells");
const Rewards = require("./Rewards");
const { findOne } = require("./Settings");
const Settings = require("./Settings");

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
  coalitionLogo: {type: String, default: "https://profile.intra.42.fr/images/default.png"},
  spins: { type: Number, default: 0 },
  lastSpin: { type: Number, default: 0 },
  lastReward: { type: String, default: null },
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

profileSchema.statics.getCoalitionSpins = async function (coalition, year, month) {
  const query = await this.find({
    coalition: coalition,
    poolYear: year,
    poolMonth: month,
    "admin?": false,
  });
  let total = 0;
  query.forEach((element) => {
    total += element.spins;
  });
  return total;
};

profileSchema.statics.getTopTen = async function(year, month) {
  const query = await this.find({
    poolYear: year,
    poolMonth: month,
    "admin?": false,
  }).sort({ spins: -1, lastSpin: -1 }).limit(10);
  const topTen = query.map((element) => {
    return {
      spins: element.spins,
      login: element.login,
      img: element.img,
      coaliton: element.coalition,
      coalitionLogo: element.coalitionLogo,
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
  const cooldown = await Settings.findByKey('cooldown');
  this.lastSpin = Date.now();
  const spinReward = {
    img: cells[goal].img,
    alt: cells[goal].alt,
    description: cells[goal].description,
    particles: cells[goal].particles,
    color: cells[goal].color,
    nextSpin: this.lastSpin + (parseInt(cooldown.value) * 1000),
  }
  this.lastReward = JSON.stringify(spinReward);
  this.spins++;
  await this.save();
  Rewards.addOne(this, cells[goal], forced);
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
