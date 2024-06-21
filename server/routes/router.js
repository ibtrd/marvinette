const express = require("express");
const router = express.Router();
const {rouletteCells} = require('../roulette/rouletteCells');
const path = require('path');
const isLoggedIn = require('../middleware/isLoggedIn')
const sendIndex = require('../middleware/sendIndex');
const Profile = require("../mongo_models/Profile");
const isAdmin = require("../middleware/isAdmin");
const adminRouter = require("./admin");
const authRouter = require("./auth");

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

router.use('/auth', authRouter);

router.use('/admin', isAdmin, adminRouter)

router.get('/login', sendIndex)

router.get('/debug', (req, res) => {
  if (!req.session.user)
  {
    console.log("no active sessions");
    res.redirect('/login')
  }
  else
  {
    console.log(`logged in as ${req.session.user.login}`);
    res.send(req.session.user);
  }
});

router.get('/', isLoggedIn, sendIndex)

router.use(express.static(path.resolve("../client/build")));

router.get('/*', isLoggedIn, sendIndex)


module.exports = router;