const express = require("express");
const authRouter = express.Router();
const { getAuthUrl } = require("../../auth/getAuthUrl");
const { callback } = require("../../auth/callback");
const LoginQueue = require("./LoginQueue");
const isAdmin = require("../../middleware/isAdmin");
const { sessionsStore } = require("../../auth/sessions");

const queue = new LoginQueue(1000);

authRouter.get('/login', (req, res) => {
	res.redirect(getAuthUrl())
});

authRouter.get("/callback", (req, res) => {
	queue.add(callback, req, res);
});
  
authRouter.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.status(500).send('Logout failure');
		} else {
			res.redirect('/login')
		}
	});
});

authRouter.get('/destroy-all-sessions', isAdmin, async (req, res) => {
	try {
		await sessionsStore.clear();
		res.send("All sessions destroyed");
	} catch (err) {
		console.error(err);
		res.status(500).send("Error occured while destroying sessions");
	}
});


module.exports = authRouter;