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
	res.send({cells, lastUpdate: rouletteCells.lastUpdate});
  });
  
wheelRouter.get("/goal/:lastUpdate", async (req, res) => {
	if (parseInt(req.params.lastUpdate) !== rouletteCells.lastUpdate) {
		return res.status(409).send({error: 'Cell grid has changed.'})
	}
	try {
		
	} catch {}
	const account = await Profile.findByLogin(req.session.user.login);
	if (account.canSpin(20 * 1000)) {
		const goal = await account.spin(rouletteCells.cells);
		console.log(`${req.session.user.login}[${account.spins}] spin:`,goal.goal, goal.description);
		res.send(goal);
	}
	else
		res.send("nope");
	});

module.exports = wheelRouter;