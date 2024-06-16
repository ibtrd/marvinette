const express = require("express");
const getCells = require("../roulette/getCells");
const router = express.Router();


router.get('/cells', async (req, res) => {
    const rouletteCells = await getCells();
    res.send(rouletteCells);
})

 module.exports = router;