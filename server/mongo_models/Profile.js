const mongoose = require("mongoose");
const randGoal = require("../roulette/randGoal");
const { rouletteCells } = require("../roulette/rouletteCells");

const profileSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  login: { type: String, required: true },
  cursusEnd: { type: Date},
  poolMonth: { type: String},
  poolYear: { type: Number},
  coalition: { type: String},
  img: {type: String, default: 'https://i.ibb.co/kDfBh0y/empty.png'},
  lastSpin: { type: Number, default: 0 },
  spins: { type: Number, default: 0 },
  'admin?' : {type: Boolean, default: false },
  next: {type: Number, default: -1 }
});

profileSchema.statics.findByLogin = async function(login) {
  return await this.findOne({ login });
};

profileSchema.methods.spin = async function(cells) {

  let goal;
  if (this.next !== -1) {
    goal = this.next;
    if (goal > cells.length) {
      goal = randGoal(rouletteCells.cells);
    }
    this.next = -1;
  } else {
    goal = randGoal(rouletteCells.cells);
  }
  this.spins++;
  this.lastSpin = Date.now();
  await this.save();
  return { goal, description: cells[goal].description, particles: cells[goal].particles};
};

profileSchema.methods.canSpin = function(cooldown = 0) {
  return this.lastSpin + cooldown < Date.now() || this.spins === 0;
};

profileSchema.methods.force = async function(index) {
  this.next = index;
  await this.save();
}


const Profile = mongoose.model("Profile", profileSchema);

console.log(Profile);

module.exports = Profile;
