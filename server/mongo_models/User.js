const mongoose = require("mongoose");

module.exports.userSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  login: { type: String, require: true },
  coalition: { type: String}, // GET /v2/users/ibertran/coalitions
  lastSpin: { type: Number, require: true },
  spins: { type: Number, require: true }
});

module.exports.user = mongoose.model(
    "user",
    module.exports.userSchema
);
