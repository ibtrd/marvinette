const express = require("express");
const randGoal = require("../roulette/randGoal");
const router = express.Router();
const {rouletteCells} = require('../roulette/rouletteCells');
const { getAuthUrl } = require("../oauth/getAuthUrl");
const { callback } = require("../oauth/callback");
const path = require('path');
const isLoggedIn = require('../middleware/isLoggedIn')
const sendIndex = require('../middleware/sendIndex');
const User = require("../mongo_models/User");

router.get('/cells', async (req, res) => {
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

router.get("/goal/:lastUpdate", async (req, res) => {
  if (parseInt(req.params.lastUpdate) !== rouletteCells.lastUpdate)
  {
    console.log('different timestamp')
    return res.status(409).send({error: 'Cell grid has changed.'})
  }
  const goal = randGoal(rouletteCells.cells);
  const account = await User.findByLogin(req.session.user.login);
  if (account.canSpin(20 * 1000)) {
    account.spin();
    console.log(`${req.session.user.login}[${account.spins}] spin:`,goal.goal, goal.description);
    res.send(goal);
  }
  else
    res.send("nope");
});

router.get('/oauth/login', (req, res) => {
  res.redirect(getAuthUrl())
});

router.get("/oauth/callback", async (req, res) => {
  callback(req, res);
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login')
  });
});

router.get('/debug', (req, res) => {
  if (!req.session.user)
  {
    console.log("no action sessions");
    res.redirect('/login')
  }
  else
  {
    console.log(`logged in as ${req.session.user.login}`);
    res.send(req.session.user);
  }
});

router.get('/login', sendIndex)

router.get('/', isLoggedIn, sendIndex)

router.use(express.static(path.resolve("../client/build")));

router.get('/*', isLoggedIn, sendIndex)


module.exports = router;
