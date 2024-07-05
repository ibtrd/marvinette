const express = require("express");
const { rouletteCells } = require("../../roulette/rouletteCells");
const Profile = require("../../mongo_models/Profile");
const Settings = require("../../mongo_models/Settings");
const wheelRouter = express.Router();

wheelRouter.get('/cells', async (req, res) => {
	var cells = []
	rouletteCells.cells.forEach(cell => {
	  cells.push({
		img: cell.img,
		alt: cell.alt,
		color: cell.color,
	  });
	});
	res.send({cells, hash: rouletteCells.hash});
  });
  
wheelRouter.get("/goal/:hash", sendGoal); 

async function sendGoal(req, res) {
	const profile = await Profile.findByLogin(req.session.user.login);
	const cooldown = await Settings.findByKey('cooldown');
	const poolStatus = await Settings.findByKey("poolStatus");
	if (!profile || !cooldown || !poolStatus) {
		return res.status(500).send();
	}
	const userPoolStatus = profile.cursusEnd < Date.now() ? "inactive" : "active";
	if (userPoolStatus !== poolStatus.value) {
		res.status(406).send({ error: "Your piscine has ended" });
	} else if (profile.canSpin(cooldown.value) === false) {
		res.status(406).send({ error: "You are in cooldown" });
	} else if (profile.coalition === null) {
		res.status(406).send({ error: "You no not have a coalition" });
	} else if (req.params.hash !== rouletteCells.hash) {
		res.status(409).send({ error: "Out of sync with the server, reload required" });
	} else {
    let goal;
    const globalGoal = await Settings.findOne({ key: "force" });
    if (globalGoal && globalGoal.value !== "-1") {
      const globalIndex = parseInt(globalGoal.value);
	  globalGoal.value = "-1";
	  globalGoal.save();
      goal = await profile.spin(rouletteCells.cells, globalIndex);
    } else {
      goal = await profile.spin(rouletteCells.cells);
    }
    res.send(goal);
  }
}

module.exports = wheelRouter;