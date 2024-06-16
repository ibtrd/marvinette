const express = require("express");
const getCells = require("../roulette/getCells");
const router = express.Router();


router.get('/cells', (req, res) => {
    const rouletteCells = getCells();
})

 module.exports = router;