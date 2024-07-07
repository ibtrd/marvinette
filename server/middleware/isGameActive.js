const Settings = require("../mongo_models/Settings");

module.exports = async function isGameActive(req, res, next) {
  const status = await Settings.findByKey("gameStatus");
  const timeout = await Settings.findByKey("statusTimeout");
  if (timeout.value !== "-1" && Date.now() >= new Date(timeout.value).getTime()) {
    status.value = status.value === "active" ? "inactive" : "active";
    await status.save();
    timeout.value = "-1";
    await timeout.save();
  }
  if (!status || status.value !== "active") {
    return res.redirect("/nofun");
  } else {
    next();
  }
};
