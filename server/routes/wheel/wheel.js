const express = require("express");
const { rouletteCells } = require("../../roulette/rouletteCells");
const Profile = require("../../mongo_models/Profile");
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
	const account = await Profile.findByLogin(req.session.user.login);
	if (!account) {
		res.status(500).send();
	} else if (!account.canSpin(20 * 1000)) {
		res.status(406).send('In cooldown');
	} else if (req.params.hash !== rouletteCells.hash) {
		res.status(409).send('Out of sync');
	} else {
		const goal = await account.spin(rouletteCells.cells);
		console.log(`${req.session.user.login}[${account.spins}] spin:`,goal.goal, goal.description);
		res.send(goal);
	}
}

module.exports = wheelRouter;