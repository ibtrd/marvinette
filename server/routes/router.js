const express = require("express");
const router = express.Router();
const path = require('path');
const sendIndex = require('./sendIndex');

const { isLoggedIn, isLoggedOut } = require('../middleware/isLoggedIn');
const isAdmin = require("../middleware/isAdmin");

const authRouter = require("./auth/auth");
const wheelRouter = require("./wheel/wheel");
const adminRouter = require("./admin/admin");
const sendProfile = require("./sendProfile");
const sendRewards = require("./sendRewards");
const sendStats = require("./sendStats");
const isGameActive = require("../middleware/isGameActive");
const isGameInactive = require("../middleware/isGameInactive");
const nofunRouter = require("./nofun/nofun");

router.use('/auth', authRouter);
router.use('/wheel', isLoggedIn, isGameActive, wheelRouter);
router.use('/admin', isLoggedIn, isAdmin, adminRouter);
router.use('/nofun', isLoggedIn, nofunRouter);


router.get('/login', isLoggedOut, sendIndex);
router.get("/nofun", isLoggedIn, isGameInactive, sendIndex);
router.get('/admin', isLoggedIn, isAdmin, sendIndex);
router.get('/me', isLoggedIn, sendProfile);
router.get('/stats', isLoggedIn, sendStats);
router.get('/rewards/:secret', sendRewards)

router.get('/', isLoggedIn, isGameActive, sendIndex)
router.use(express.static(path.resolve("./build")));
router.get('/*', isLoggedIn, sendIndex)

module.exports = router;
