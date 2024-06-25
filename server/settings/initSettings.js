const Settings = require("../mongo_models/Settings");
const defaultSettings = require("./defaultSettings.json");

module.exports = async function initSettings() {
  console.log("SETTINGS:");
  const cooldown = await Settings.findOne({key: 'cooldown'})
  if (!cooldown) {
      await Settings.create({
          key: "cooldown",
          value: defaultSettings.cooldown,
      })
  }
  
  const poolYear = await Settings.findOne({ key: "poolYear" });
  if (!poolYear) {
    await Settings.create({
      key: "poolYear",
      value: defaultSettings.poolYear,
    });
  }
  
  const poolMonth = await Settings.findOne({key: 'poolMonth'})
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

  const force = await Settings.findOne({ key: "force" });
    if (!force) {
      await Settings.create({
        key: "force",
        value: defaultSettings.force,
      });
    }

  const gameStatus = await Settings.findOne({ key: "gameStatus" });
  if (!gameStatus) {
    await Settings.create({
      key: "gameStatus",
      value: defaultSettings.gameStatus,
    });
  }

  const settings = await Settings.find({});
  settings.forEach(element => {
    console.log(element.key, '=', element.value);
  });
  console.log();
}
