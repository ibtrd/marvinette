const express = require("express");
const adminRouter = express.Router();
const Profile = require("../../mongo_models/Profile");
const { rouletteCells } = require("../../roulette/rouletteCells");
const Settings = require("../../mongo_models/Settings");
// const isAdmin = require("../../middleware/isAdmin");
// const sendIndex = require("../sendIndex");

adminRouter.post('/global', forceGlobalGoal);
adminRouter.post('/force', forceGoal)

adminRouter.get('/cells', async (req, res) => {
  var cells = []
  rouletteCells.cells.forEach(cell => {
      cells.push({
        name: cell.name,
      });
  });
  res.send({cells});
});

async  function forceGoal(req, res) {
  const profile = await Profile.findByLogin(req.body.login)
  if (profile === null)
    return res.status(400).send("User not found");
  const index = req.body.index;
  if (index < -1 || index > rouletteCells.cells.length - 1)
    return res.status(400).send("Value out of range");
  profile.force(index);
  if (index === -1) {
    console.log(`ADMIN ${req.session.user.login} REMOVED FORCE ${profile.login}`);
  } else {
    console.log(`ADMIN ${req.session.user.login} FORCED ${profile.login}: ${index}`);
  }
  res.send("User forced");
}

async function forceGlobalGoal(req, res) {
  const index = req.body.index;
  if (index < -1 || index > rouletteCells.cells.length - 1) {
    return res.status(400).send("Value out of range");
  }
  await Settings.findOneAndReplace(
    { key: "force" },
    { key: "force", value: index.toString() },
    { upsert: true }
  );
  console.log(`ADMIN ${req.session.user.login} FORCED GLOBAL: ${index}`);
  res.send();
}

adminRouter.get("/settings/:key", async (req, res) => {
  
  const settings = await Settings.findOne({ key: req.params.key });
  if(settings === null) {
    return res.status(404).send("Settings not found");
  } else {
    res.send(JSON.stringify(settings.value));
  }
});

adminRouter.post("/settings/:key", async (req, res) => {
  const settings = await Settings.findOne({ key: req.params.key });
  if(settings && req.body.value) {
    console.log(`ADMIN ${req.session.user.login} changed settings ${req.params.key} to ${req.body.value}`);
    settings.value = req.body.value;
    await settings.save();
    res.send();
  }
  else {
    return res.status(400).send("Settings not found");
  }
});

module.exports = adminRouter;