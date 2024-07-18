const express = require("express");
const Settings = require("../../mongo_models/Settings");
const nofunRouter = express.Router();

nofunRouter.get('/data', async (req, res) => {
	const msg = (await Settings.findOne({key: 'inactiveMsg'})).value;
	const title = (await Settings.findOne({key: 'inactiveTitle'})).value;
	const img = (await Settings.findOne({key: 'inactiveImage'})).value;
	res.send( {
		msg, title, img
	})
})

module.exports = nofunRouter;