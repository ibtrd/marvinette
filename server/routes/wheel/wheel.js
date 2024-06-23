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
	const userPoolStatus = profile.cursusEnd < Date.now() ? "ended" : "ongoing";
	if (userPoolStatus !== poolStatus.value) {
		res.status(406).send("Your piscine has ended");
	} else if (profile.canSpin(cooldown.value)) {
		res.status(406).send("You are in cooldown");
	} else if (req.params.hash !== rouletteCells.hash) {
		res.status(409).send("Out of sync with the server, reload required");
	} else {
    let goal;
    const globalGoal = await Settings.findOne({ key: "force" });
	console.log(globalGoal)
    if (globalGoal) {
		const globalIndex = globalGoal.value;
		await Settings.deleteOne({ _id: globalGoal._id });
		goal = await profile.spin(rouletteCells.cells, globalIndex);
    } else {
      goal = await profile.spin(rouletteCells.cells);
    }
    console.log(
      `${req.session.user.login}[${profile.spins}] spin:`,
      goal.goal,
      goal.description
    );
    res.send(goal);
  }
}

module.exports = wheelRouter;