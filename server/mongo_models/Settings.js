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
    Settings.create({
      key: "cooldown",
      value: defaultSettings.cooldown,
    });
    return parseInt(defaultSettings.cooldown);
  }
  return parseInt(query.value);
};

settingsSchema.statics.getPoolYear = async function () {
  const query = await this.findOne({ key: "poolYear" });
  if (!query) {
    Settings.create({
      key: "poolYear",
      value: defaultSettings.poolYear,
    });
    return parseInt(defaultSettings.poolYear);
  }
  return parseInt(query.value);
};

settingsSchema.statics.getPoolMonth = async function () {
  const query = await this.findOne({ key: 'poolMonth' });
  if (!query) {
    Settings.create({
      key: "poolMonth",
      value: defaultSettings.poolMonth,
    });
    return defaultSettings.poolMonth;
  }
  return query.value;
};

settingsSchema.statics.getPoolStatus = async function () {
  const query = await this.findOne({ key: "poolStatus" });
  if (!query) {
    Settings.create({
      key: "poolStatus",
      value: defaultSettings.poolStatus,
    });
    return defaultSettings.poolStatus;
  }
  return query.value;
};

settingsSchema.statics.getGameStatus = async function () {
  const query = await this.findOne({ key: "gameStatus" });
  if (!query) {
    Settings.create({
      key: "gameStatus",
      value: defaultSettings.gameStatus,
    });
    return defaultSettings.gameStatus;
  }
  return query.value;
};

settingsSchema.statics.getStatusTimeout = async function () {
  const query = await this.findOne({ key: "statusTimeout" });
  if (!query) {
    Settings.create({
      key: "statusTimeout",
      value: defaultSettings.statusTimeout,
    });
    return defaultSettings.statusTimeout;
  }
  return query.value;
};

settingsSchema.statics.getInactiveMsg = async function () {
  const query = await this.findOne({ key: "inactiveMsg" });
  if (!query) {
    Settings.create({
      key: "inactiveMsg",
      value: defaultSettings.inactiveMsg
    });
    return defaultSettings.inactiveMsg;
  }
  return query.value;
};

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
