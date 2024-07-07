const express = require("express");
const adminRouter = express.Router();
const Profile = require("../../mongo_models/Profile");
const { rouletteCells } = require("../../roulette/rouletteCells");
const Settings = require("../../mongo_models/Settings");
const { sessionsStore } = require("../../auth/sessions");
const ServerLogs = require("../../mongo_models/ServerLogs");
const Rewards = require("../../mongo_models/Rewards");

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
  ServerLogs.force(
    Profile.findByLogin(req.session.user.login),
    profile.login,
    index,
    index !== -1 ? rouletteCells.cells[index].name : null
  );
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
  ServerLogs.force(
    Profile.findByLogin(req.session.user.login),
    "GLOBAL",
    index,
    index !== -1 ? rouletteCells.cells[index].name : null
  );
  res.send();
}

adminRouter.get('/settings/:key', async (req, res) => {
  const settings = await Settings.findOne({ key: req.params.key });
  if(settings === null) {
    return res.status(404).send(`${req.params.key} setting not found`);
  } else {
    res.send(JSON.stringify(settings.value));
  }
});

adminRouter.post('/settings/:key', async (req, res) => {
  const settings = await Settings.findOne({ key: req.params.key });
  if(settings && req.body.value) {
    settings.value = req.body.value;
    await settings.save();
    ServerLogs.setting(
      Profile.findByLogin(req.session.user.login),
      req.params.key,
      req.body.value,
    );
    res.send();
  }
  else {
    return res.status(400).send(`${req.params.key} setting not found`);
  }
});

adminRouter.get('/logout-all', async (req, res) => {
  try {
    sessionsStore.clear();
    console.log(`All sessions destroyed by ${req.session.user.login}`);
    res.send("All sessions destroyed");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occured while destroying sessions");
  }
});

adminRouter.get('/logs', async (req, res) => {
  try {
    const query = await ServerLogs.find({}).sort({ timestamp: -1 }).limit(50);
    const logs = query.map(log => {
      const formattedDate = log.timestamp.toLocaleString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      return formattedDate + " " + log.message;
    });
    res.send(logs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occured while fetching logs");
  }
});

adminRouter.get('/stats', async (req, res) => {
  try {
    const [poolYear, poolMonth] = await Promise.all([
      Settings.getPoolYear(),
      Settings.getPoolMonth(),
    ])
    const [tig, achievement, altarian, evalPts, coaPts] = await Promise.all([
      Rewards.getTotalTig(poolYear, poolMonth),
      Rewards.getTotalAchievement(poolYear, poolMonth),
      Rewards.getTotalAltarian(poolYear, poolMonth),
      Rewards.getTotalEvalPts(poolYear, poolMonth),
      Rewards.getTotalCoaPts(poolYear, poolMonth),
    ]);
    res.send({ tig, achievement, altarian, evalPts, coaPts});
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving admin stats");
  }
});

module.exports = adminRouter;