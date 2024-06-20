const axios = require('axios');
const { oauthConfig, admins, userSettings } = require("../oauth/config");
const { getIntraUser, getCoalition, isPiscineux } = require("../oauth/getIntraUser");
const User = require('../mongo_models/User');


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
      res.redirect('/');
    } catch (err) {
      console.error(
        "Error retrieving access token:",
        err.response ? err.response.data : err.message
      );
      res.status(500).send("Error retrieving access token");
    }
}

async function addUser(intraUser, coalition) {
  var user = await User.findOne({ id: intraUser.id });
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
    group: coalition,
    poolYear: 'mettre lanee',
    poolMonth: 'mettre le mois',
    lastSpin: 0,
    spins: 0,
  })
  console.log(`New user created: ${intraUser.login} (${coalition})`);
}


async function getGroup(intraUser, token) {
  // Administators
  admins.forEach( (admin) => {
    if (admin === intraUser.login)
      return ('admin');
  })
  // Coalitions
  try {
    const response = await fetch(`https://api.intra.42.fr/v2/users/${intraUser.id}/coalitions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    const coalitions = await response.json();
      const group = coalitions.find(
        (coa) => (userSettings.coalitionsIds.find(id => id === coa.id)));
          console.log(group.name);
          return group;
  } catch {
    const err = new Error("Error fetching 42API");
    err.code = 502;
    throw err;
  }
}

function getCursusEnd(intraUser) {
  const cursus = intraUser.cursus_user.find((cursus) => cursus.id === userSettings.cursus.id)
  if (cursus != undefined)
    return cursus.end_at;
  const err = new Error("You do not have an active Piscine cursus");
  err.code = 403;
  throw err;
}