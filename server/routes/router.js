const express = require("express");
const router = express.Router();
const {rouletteCells} = require('../roulette/rouletteCells');
const path = require('path');
const isLoggedIn = require('../middleware/isLoggedIn');
const sendIndex = require('./sendIndex');
const Profile = require("../mongo_models/Profile");
const isAdmin = require("../middleware/isAdmin");

const authRouter = require("./auth/auth");
const wheelRouter = require("./wheel/wheel");
const adminRouter = require("./admin/admin");
const sendProfile = require("./sendProfile");

router.use('/auth', authRouter);
router.use('/wheel', isLoggedIn, wheelRouter);
router.use('/admin', isAdmin, adminRouter);

router.get('/login', sendIndex);
router.get('/me', isLoggedIn, sendProfile)

router.get('/', isLoggedIn, sendIndex)
router.use(express.static(path.resolve("../client/build")));
router.get('/*', isLoggedIn, sendIndex)

module.exports = router;

