const Profile = require("../mongo_models/Profile");
const Settings = require("../mongo_models/Settings");

module.exports = async function isGameInactive(req, res, next) {
  const status = await Settings.findByKey("gameStatus");
  const timeout = await Settings.findByKey("statusTimeout");
  if (!status || !timeout) {
    return res.status(500).send();
  }
  if (timeout.value !== "-1" && Date.now() >= new Date(timeout.value).getTime()) {
    status.value = status.value === "active" ? "inactive" : "active";
    await status.save();
    timeout.value = "-1";
    await timeout.save();
  }
  const profile = await Profile.findByLogin(req.session.user.login);
  if (status.value !== "active" || (profile && profile['admin?'] === true)) {
    next();
  } else {
    return res.redirect("/");
  }
};
