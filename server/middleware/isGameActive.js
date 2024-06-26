const Settings = require("../mongo_models/Settings");

module.exports = async function isGameActive(req, res, next) {
  const status = await Settings.findByKey("gameStatus");
  if (!status || status.value !== "active") {
    return res.redirect("/nofun");
  } else {
    next();
  }
};
