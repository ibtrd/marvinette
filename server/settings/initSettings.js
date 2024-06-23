const Settings = require("../mongo_models/Settings");

module.exports = async function initSettings() {
  console.log("SETTINGS:");
  const cooldown = await Settings.findOne({key: 'cooldown'})
  if (!cooldown) {
      await Settings.create({
          key: "cooldown",
          value: (60 * 1000).toString(),
      })
  }
  
  const poolYear = await Settings.findOne({ key: "poolYear" });
  if (!poolYear) {
    await Settings.create({
      key: "poolYear",
      value: "2023",
    });
  }
  
  const poolMonth = await Settings.findOne({key: 'poolMonth'})
  if (!poolMonth) {
      await Settings.create({
          key: "poolMonth",
          value: 'July',
      });  
  }

  const poolStatus = await Settings.findOne({ key: "poolStatus" });
    if (!poolStatus) {
      await Settings.create({
        key: "poolStatus",
        value: "Ended",
      });
    }

  const settings = await Settings.find({});
  settings.forEach(element => {
    console.log(element.key, '=', element.value);
  });
  console.log();
}
