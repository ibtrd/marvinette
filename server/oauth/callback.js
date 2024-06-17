const axios = require('axios');
const { oauthConfig } = require("../oauth/config");
const { getUser, getCoalition, isPiscineux } = require("../oauth/getUser");


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
      const user = await getUser(response.data.access_token);
      const cursus = await isPiscineux(response.data.access_token, user);
      console.log('coaltion:', cursus);
      req.session.user = {
        id: user.id,
        login: user.login,
        coalition: cursus,
        token: response.data };
      res.redirect('http://localhost:3000/roulette');
    } catch (err) {
      console.error(
        "Error retrieving access token:",
        err.response ? err.response.data : err.message
      );
      res.status(500).send("Error retrieving access token");
    }
}
