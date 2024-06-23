const express = require("express");
const adminRouter = express.Router();
const Profile = require("../../mongo_models/Profile");
const { rouletteCells } = require("../../roulette/rouletteCells");
const Settings = require("../../mongo_models/Settings");

adminRouter.get('/global', forceGlobalGoal);
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
  console.log(`ADMIN ${req.session.user.login} FORCED ${profile.login}: ${index}`);
  res.send("User forced");
}

async function forceGlobalGoal(req, res) {
  const index = req.body.index;
  if (index === -1) {
    await Settings.findOneAndDelete({ key: "force" });
    return res.send();
  } else if (index < -1 || index > rouletteCells.cells.length - 1) {
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

module.exports = adminRouter;