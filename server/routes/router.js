const express = require("express");
const randGoal = require("../roulette/randGoal");
const router = express.Router();
const {rouletteCells} = require('../roulette/rouletteCells');
const { getAuthUrl } = require("../oauth2/getAuthUrl");

router.get('/cells', async (req, res) => {
    const response = {
        cells: rouletteCells.cells.map(cell => ({ ...cell })),
        lastUpdate: rouletteCells.lastUpdate}
    response.cells.forEach((cell) => {
      delete cell['weight'];
    });
    res.send(response);
});

router.get("/goal/:lastUpdate", async (req, res) => {
    if (parseInt(req.params.lastUpdate) !== rouletteCells.lastUpdate)
    {
        console.log('different timestamp')
        return res.status(403).send({error: 'Cell grid has change.'})
    }
    const goal = randGoal(rouletteCells.cells);
    console.log('Someone got goal : ' + goal.goal)
    res.send(goal);
});

router.get('/login', (req, res) => {
    res.redirect(getAuthUrl())
});

 module.exports = router;
 