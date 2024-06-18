const mongoose = require("mongoose");

module.exports.userSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  login: { type: String, require: true },
  coalition: { type: String},
  lastSpin: { type: Number, require: true },
  spins: { type: Number, require: true }
// }, {
//     methods: Truc,
  }
);

module.exports.User = mongoose.model(
    "User",
    module.exports.userSchema
);
