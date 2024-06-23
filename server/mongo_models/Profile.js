const mongoose = require("mongoose");
const randGoal = require("../roulette/randGoal");
const { rouletteCells } = require("../roulette/rouletteCells");
const Rewards = require("./Rewards");

const profileSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  login: { type: String, required: true },
  img: {type: String, default: 'https://profile.intra.42.fr/images/default.png'},
  cursusEnd: { type: Date},
  poolMonth: { type: String},
  poolYear: { type: Number},
  coalition: { type: String},
  spins: { type: Number, default: 0 },
  lastSpin: { type: Number, default: 0 },
  lastReward: { type: String, default: null},
  'next?' : { type: Number},
  'admin?' : {type: Boolean, default: false },
});

profileSchema.statics.findByLogin = async function(login) {
  return await this.findOne({ login });
};

profileSchema.methods.spin = async function(cells) {

  let goal;
  if (this['next?'] !== undefined) {
    goal = this['next?'];
    if (goal < 0 || goal > cells.length) {
      goal = randGoal(rouletteCells.cells);
    }
    this['next?'] = undefined;
  } else {
    goal = randGoal(rouletteCells.cells);
  }
  this.lastSpin = Date.now();
  const spinReward = {
    img: cells[goal].img,
    alt: cells[goal].alt,
    description: cells[goal].description,
    particles: cells[goal].particles,
    color: cells[goal].color,
    nextSpin: this.lastSpin + 1 * 25 * 1000,
  }
  this.lastReward = JSON.stringify(spinReward);
  this.spins++;
  await this.save();
  Rewards.addOne(this, cells[goal]);
  return { goal, ...spinReward};
};

profileSchema.methods.canSpin = function(cooldown = 0) {
  return this.lastSpin + cooldown < Date.now() || this.spins === 0;
};

profileSchema.methods.force = async function(index) {
  if (index === -1)
    this['next?'] = undefined;
  else
    this['next?'] = index;
  await this.save();
}


const Profile = mongoose.model("Profile", profileSchema);

console.log(Profile);

module.exports = Profile;
