const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  login: { type: String, required: true },
  cursusEnd: { type: Date},
  poolMonth: { type: String},
  poolYear: { type: Number},
  coalition: { type: String},
  lastSpin: { type: Number, default: 0 },
  spins: { type: Number, default: 0 },
  'admin?' : {type: Boolean, default : false },
});

userSchema.statics.findByLogin = async function(login) {
  return this.findOne({ login });
};

userSchema.methods.spin = function() {
  this.spins++;
  this.lastSpin = Date.now();
  return this.save();
};

userSchema.methods.canSpin = function(cooldown = 0) {
  return this.lastSpin + cooldown < Date.now() || this.spins === 0;
};

const User = mongoose.model("User", userSchema);

console.log(User);

module.exports = User;
