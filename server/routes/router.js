const express = require("express");
const router = express.Router();
const path = require('path');
const sendIndex = require('./sendIndex');

const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require("../middleware/isAdmin");
const isKunfandi = require("../middleware/isKunfandi");

const authRouter = require("./auth/auth");
const wheelRouter = require("./wheel/wheel");
const adminRouter = require("./admin/admin");
const sendProfile = require("./sendProfile");
const sendRewards = require("./sendRewards");

router.use('/auth', authRouter);
router.use('/wheel', isLoggedIn, wheelRouter);
router.use('/admin', isAdmin, adminRouter);

router.get('/login', sendIndex);
router.get('/me', isLoggedIn, sendProfile);
router.get('/rewards/:secret', isKunfandi, sendRewards)

router.get('/', isLoggedIn, sendIndex)
router.use(express.static(path.resolve("./build")));
router.get('/*', isLoggedIn, sendIndex)

module.exports = router;
