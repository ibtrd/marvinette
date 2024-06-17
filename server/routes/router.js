const express = require("express");
const randGoal = require("../roulette/randGoal");
const router = express.Router();
const {rouletteCells} = require('../roulette/rouletteCells');
const { getAuthUrl } = require("../oauth/getAuthUrl");
const axios = require('axios');
const { oauthConfig } = require("../oauth/config");
const { getUser } = require("../oauth/getUser");

router.get('/cells', async (req, res) => {
    const response = {
        cells: rouletteCells.cells.map(cell => ({ ...cell })),
        lastUpdate: rouletteCells.lastUpdate}
    response.cells.forEach((cell) => {
      delete cell['weight'];
    });
    res.send(response);
});

router.get("/goal/:lastUpdate", async (req, res) => {
    if (parseInt(req.params.lastUpdate) !== rouletteCells.lastUpdate)
    {
        console.log('different timestamp')
        return res.status(403).send({error: 'Cell grid has change.'})
    }
    const goal = randGoal(rouletteCells.cells);
    console.log('Someone got goal : ' + goal.goal)
    res.send(goal);
});

router.get('/oauth/login', (req, res) => {
    res.redirect(getAuthUrl())
});

router.get("/oauth/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send("Authorization code not provided");
  }

  const requestBody = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    client_id: oauthConfig.clientId,
    client_secret: oauthConfig.clientSecret,
    redirect_uri: oauthConfig.redirectUri,
  });

  try {
    const response = await axios.post(
      oauthConfig.tokenEndpoint,
      requestBody.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const user = await getUser(response.data.access_token);
    console.log(user);
    // req.session.accessToken = response.data.access_token;
    // req.session.refreshToken = response.data.refresh_token;

    res.redirect("/user");
  } catch (err) {
    console.error(
      "Error retrieving access token:",
      err.response ? err.response.data : err.message
    );
    res.status(500).send("Error retrieving access token");
  }
});

 module.exports = router;
