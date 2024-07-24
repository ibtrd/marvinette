const Settings = require("../mongo_models/Settings");
const defaultSettings = require("./defaultSettings.json");

module.exports = async function initSettings() {

  const cooldown = await Settings.findOne({ key: "cooldown" });
  if (!cooldown) {
    await Settings.create({
      key: "cooldown",
      value: defaultSettings.cooldown,
    });
  }

  const poolYear = await Settings.findOne({ key: "poolYear" });
  if (!poolYear) {
    await Settings.create({
      key: "poolYear",
      value: defaultSettings.poolYear,
    });
  }

  const poolMonth = await Settings.findOne({ key: "poolMonth" });
  if (!poolMonth) {
    await Settings.create({
      key: "poolMonth",
      value: defaultSettings.poolMonth,
    });
  }

  const poolStatus = await Settings.findOne({ key: "poolStatus" });
  if (!poolStatus) {
    await Settings.create({
      key: "poolStatus",
      value: defaultSettings.poolStatus,
    });
  }

  const inactiveMsg = await Settings.findOne({ key: "inactiveMsg" });
  if (!inactiveMsg) {
    await Settings.create({
      key: "inactiveMsg",
      value: defaultSettings.inactiveMsg,
    });
  }

  const inactiveTitle = await Settings.findOne({ key: "inactiveTitle" });
  if (!inactiveTitle) {
    await Settings.create({
      key: "inactiveTitle",
      value: defaultSettings.inactiveTitle,
    });
  }

  const inactiveImage = await Settings.findOne({ key: "inactiveImage" });
  if (!inactiveImage) {
    await Settings.create({
      key: "inactiveImage",
      value: defaultSettings.inactiveImage,
    });
  }

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

  const statsTimestampStart = await Settings.findOne({ key: "statsTimestampStart" });
  if (!statsTimestampStart) {
    await Settings.create({
      key: "statsTimestampStart",
      value: defaultSettings.statsTimestampStart,
    });
  }

  const statsTimestampEnd = await Settings.findOne({ key: "statsTimestampEnd" });
  if (!statsTimestampEnd) {
    await Settings.create({
      key: "statsTimestampEnd",
      value: defaultSettings.statsTimestampEnd,
    });
  }

  const sheetName = await Settings.findOne({ key: "sheetName" });
  if (!sheetName) {
    await Settings.create({
      key: "sheetName",
      value: defaultSettings.sheetName,
    });
  }

}