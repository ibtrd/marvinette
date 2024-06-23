const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

settingsSchema.statics.findByKey = async function(key) {
  return await this.findOne({ key });
};

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
