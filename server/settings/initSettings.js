const Settings = require("../mongo_models/Settings");

console.log('SETTINGS:')

const cooldown = Settings.find({key: 'cooldown'})
if (cooldown == undefined) {
    Settings.create({
        key: "cooldown",
        value: (60 * 1000).toString(),
    })
}
console.log('cooldown:'(60 * 1000).toString());

const poolYear = Settings.find({ key: "poolYear" });
if (poolYear == undefined) {
  Settings.create({
    key: "cooldown",
    value: "2023",
  });
}

const poolMonth = Settings.find({key: 'poolMonth'})
if (poolMonth == undefined) {
    Settings.create({
        key: "cooldown",
        value: 'July',
    });  
}