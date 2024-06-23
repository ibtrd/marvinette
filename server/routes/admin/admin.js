const express = require("express");
const adminRouter = express.Router();
const Profile = require("../../mongo_models/Profile");
const Settings = require("../../mongo_models/Settings");

adminRouter.get("/global/:index", forceGlobalGoal);
adminRouter.get('/:login/:index', forceGoal)

async  function forceGoal(req, res) {
  const profile = await Profile.findByLogin(req.params.login)
  if (profile === null)
    return res.status(400).send("User not found");
  const index = parseInt(req.params.index);
  if (index < -1 || index > 41)
    return res.status(400).send("Value out of range");
  profile.force(index);
  console.log(`ADMIN ${req.session.user.login} FORCED ${profile.login}: ${index}`);
  res.send();
}

async function forceGlobalGoal(req, res) {
  const index = req.params.index;
  if (index === -1) {
    await Settings.findOneAndDelete({ key: "force" });
    return res.send();
  } else if (index < -1 || index > 41) {
    return res.status(400).send("Value out of range");
  }
  await Settings.findOneAndReplace(
    { key: "force" },
    {
      key: "force",
      value: index.toString(),
    },
    {
      upsert: true,
    }
  );
  console.log(`ADMIN ${req.session.user.login} FORCED GLOBAL: ${index}`);
  res.send();
}

module.exports = adminRouter;