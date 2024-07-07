const Settings = require("../mongo_models/Settings");
const defaultSettings = require("./defaultSettings.json");

module.exports = async function initSettings() {
  const gameStatus = await Settings.findOne({ key: "gameStatus" });
  if (!gameStatus) {
    await Settings.create({
      key: "gameStatus",
      value: defaultSettings.gameStatus,
    });
  }
  const statusTimeout = await Settings.findOne({ key: "statusTimeout" });
  if (!statusTimeout) {
    await Settings.create({
      key: "statusTimeout",
      value: defaultSettings.statusTimeout,
    });
  }

  const force = await Settings.findOne({ key: "force" });
  if (!force) {
    await Settings.create({
      key: "force",
      value: defaultSettings.force,
    });
  }
}