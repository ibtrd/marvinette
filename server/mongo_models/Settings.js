const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

settingsSchema.statics.findByKey = async function(key) {
  return await this.findOne({ key });
};

settingsSchema.statics.getPoolYear = async function () {
  const query = await this.findOne({ key: "poolYear" });
  return parseInt(query.value);
};

settingsSchema.statics.getPoolMonth = async function () {
  const query = await this.findOne({ key: 'poolMonth' });
  return query.value;
};

settingsSchema.statics.getChampion = async function () {
  const query = await this.findOne({ key: "poolMonth" });
  return query.value;
};

settingsSchema.statics.getChampion = async function (key) {
  return await this.findOne({ key });
};

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
