const express = require("express");
const randGoal = require("../roulette/randGoal");
const router = express.Router();
const {rouletteCells} = require('../roulette/rouletteCells');
const { getAuthUrl } = require("../oauth/getAuthUrl");
const { callback } = require("../oauth/callback");

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
  console.log(req.session);
  // console.log(`${req.session.user.login} spin: ` + goal.goal)
  res.send(goal);
});

router.get('/oauth/login', (req, res) => {
  res.redirect(getAuthUrl())
});

router.get("/oauth/callback", async (req, res) => {
  callback(req, res);
});

router.get('/oauth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.send('User logged out');
  });
});

router.get("/session/status", async (req, res) => {
  console.log(req.session.user);
  if (req.session.user) {
    res.json({ loggedIn: true});
  } else {
    res.json({ loggedIn: false });
  }
});

router.get('/debug', (req, res) => {
  if (!req.session.user)
  {
    console.log("no action sessions");
    res.redirect('http://localhost:3000/oauth/login')
  }
  else
  {
    console.log(`logged in as ${req.session.user.login}`);
    res.send(req.session.user);
  }
});

 module.exports = router;
