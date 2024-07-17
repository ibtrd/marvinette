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

let	processingSpins = [];

async function sendGoal(req, res) {
	if (processingSpins.indexOf(req.session.user.login) !== -1)
		return res.status(429);
	else
		processingSpins.push(req.session.user.login);
	const profile = await Profile.findByLogin(req.session.user.login);
	const cooldown = await Settings.getCooldown();
	const poolStatus = await Settings.getPoolStatus();
	if (!profile) {
		console.error("Failed to fetch settings", cooldown);
		res.status(500).send();
	} else if ((profile.cursusEnd < Date.now() ? "inactive" : "active") !== poolStatus) {
		res.status(406).send({ error: "Your piscine has ended" });
	} else if (profile.canSpin(cooldown) === false) {
		res.status(406).send({ error: "You are in cooldown" });
	} else if (profile.coalition === null) {
		res.status(406).send({ error: "You do not have a Piscine coalition" });
	} else if (req.params.hash !== rouletteCells.hash) {
		res.status(409).send({ error: "Out of sync with the server, reload required" });
	} else {
		let goal;
		const globalGoal = await Settings.findByKey('force');
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
	processingSpins = processingSpins.filter(login => login !== req.session.user.login)
}

module.exports = wheelRouter;