const express = require("express");
const authRouter = express.Router();
const { getAuthUrl } = require("../../auth/getAuthUrl");
const { callback } = require("../../auth/callback");
const LoginQueue = require("./LoginQueue");
const isAdmin = require("../../middleware/isAdmin");
const { sessionsStore } = require("../../auth/sessions");

const queue = new LoginQueue(1000);

authRouter.get('/status', (req, res) => {
	if (req.session.user) {
		res.send();
	} else {
		res.status(403).send();
	}
})

authRouter.get('/login', (req, res) => {
	if (req.session.user) {
		res.redirect('/');
	} else {
		res.redirect(getAuthUrl());
	}
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
		sessionsStore.clear();
		console.log(`All sessions destroyed by ${req.session.user.login}`)
		res.send("All sessions destroyed");
	} catch (err) {
		console.error(err);
		res.status(500).send("Error occured while destroying sessions");
	}
});


module.exports = authRouter;