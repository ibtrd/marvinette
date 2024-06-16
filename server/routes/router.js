const express = require("express");
const getCells = require("../roulette/getCells");
const randGoal = require("../roulette/randGoal");
const router = express.Router();


router.get('/cells', async (req, res) => {
    const rouletteCells = await getCells();
    res.send(rouletteCells);
});

router.get("/goal", async (req, res) => {
    const cells = await getCells();
    const goal = randGoal(cells);
    res.send(goal);
});

 module.exports = router;