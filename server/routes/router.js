const express = require("express");
const randGoal = require("../roulette/randGoal");
const router = express.Router();
const {rouletteCells} = require('../roulette/rouletteCells');
const { getAuthUrl } = require("../oauth/getAuthUrl");
const { callback } = require("../oauth/callback");
const path = require('path');
const isLoggedIn = require('../middleware/isLoggedIn')
const sendIndex = require('../middleware/sendIndex');
const Profile = require("../mongo_models/Profile");
const isAdmin = require("../middleware/isAdmin");

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

router.get('/force/:login/:index', isAdmin, forceGoal)

router.get('/login', sendIndex)

router.get('/', isLoggedIn, sendIndex)

router.use(express.static(path.resolve("../client/build")));

router.get('/*', isLoggedIn, sendIndex)


module.exports = router;

async  function forceGoal(req, res) {
  const profile = await Profile.findByLogin(req.params.login)
  if (profile === null)
    return res.status(400).send("User not found");
  const index = parseInt(req.params.index);
  if (index < 0 || index > 41)
    return res.status(400).send("Value out of range");
  profile.force(index);
  console.log(`ADMIN ${req.session.user.login} FORCED ${profile.login}: ${index}`);
}
