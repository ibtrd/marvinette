const axios = require('axios');
const { oauthConfig } = require("../oauth/config");
const { getIntraUser, getCoalition, isPiscineux } = require("../oauth/getIntraUser");
const { User } = require('../mongo_models/User');


module.exports.callback = async function callback(req, res) {
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
      const intraUser = await getIntraUser(response.data.access_token);
      const coalition = await isPiscineux(response.data.access_token, intraUser);
      if (coalition === false) {
        return res.status(500).send("You do not have an active Piscine cursus");
      }
      req.session.user = {
        id: intraUser.id,
        login: intraUser.login,
        coalition: coalition,
        token: response.data };
      await addUser(intraUser);
      res.redirect('http://localhost:3000/');
    } catch (err) {
      console.error(
        "Error retrieving access token:",
        err.response ? err.response.data : err.message
      );
      res.status(500).send("Error retrieving access token");
    }
}

async function addUser(intraUser, coalition) {
  var user = await User.findOne({id: intraUser.id});
  if (user) {
    if (user.coalition === null && coalition !== null) {
      user.coalition = coalition;
      await user.save();
      console.log(`Updated user: ${intraUser.login} (${coalition})`);
    }
    return;
  }
  user = await User.create({
    id: intraUser.id,
    login: intraUser.login,
    coalition: coalition,
    lastSpin: 0,
    spins: 0,
  })
  console.log(`New user created: ${intraUser.login} (${coalition})`);
}
