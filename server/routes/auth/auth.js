const express = require("express");
const authRouter = express.Router();
const { getAuthUrl } = require("../../auth/getAuthUrl");
const { callback } = require("../../auth/callback");

authRouter.get('/login', (req, res) => {
	res.redirect(getAuthUrl())
});
  
authRouter.get("/callback", callback);
  
authRouter.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err)
			return res.status(500).send('Error logging out');
		res.redirect('/login')
	});
});

module.exports = authRouter;