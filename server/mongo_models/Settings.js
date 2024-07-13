const mongoose = require("mongoose");
const defaultSettings = require("../settings/defaultSettings.json");

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

settingsSchema.statics.findByKey = async function(key) {
  return await this.findOne({ key });
};

settingsSchema.statics.getCooldown = async function () {
  const query = await this.findOne({ key: "cooldown" });
  if (!query) {
    return parseInt(defaultSettings.cooldown);
  }
  return parseInt(query.value);
};

settingsSchema.statics.getPoolYear = async function () {
  const query = await this.findOne({ key: "poolYear" });
  if (!query) {
    return parseInt(defaultSettings.poolYear);
  }
  return parseInt(query.value);
};

settingsSchema.statics.getPoolMonth = async function () {
  const query = await this.findOne({ key: 'poolMonth' });
  if (!query) {
    return defaultSettings.poolMonth;
  }
  return query.value;
};

settingsSchema.statics.getPoolStatus = async function () {
  const query = await this.findOne({ key: "poolStatus" });
  if (!query) {
    return defaultSettings.poolStatus;
  }
  return query.value;
};

settingsSchema.statics.getGameStatus = async function () {
  const query = await this.findOne({ key: "gameStatus" });
  if (!query) {
    return defaultSettings.gameStatus;
  }
  return query.value;
};

settingsSchema.statics.getStatusTimeout = async function () {
  const query = await this.findOne({ key: "statusTimeout" });
  if (!query) {
    return defaultSettings.statusTimeout;
  }
  return query.value;
};

settingsSchema.statics.getInactiveMsg = async function () {
  const query = await this.findOne({ key: "inactiveMsg" });
  if (!query) {
    return defaultSettings.inactiveMsg;
  }
  return query.value;
};

settingsSchema.statics.getStatsTimestampStart = async function () {
  const query = await this.findOne({ key: "statsTimestampStart" });
  if (!query) {
    return new Date(defaultSettings.statsTimestampStart);
  }
  return new Date(query.value);
};

settingsSchema.statics.getStatsTimestampEnd = async function () {
  const query = await this.findOne({ key: "statsTimestampEnd" });
  if (!query) {
    return new Date(defaultSettings.statsTimestampEnd);
  }
  return new Date(query.value);
};

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
