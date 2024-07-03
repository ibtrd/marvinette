const axios = require('axios');
const { oauthConfig, administrators, userSettings, coalitions } = require("../auth/config");
const { getIntraUser } = require("../auth/getIntraUser");
const Profile = require('../mongo_models/Profile');

module.exports.callback = async function callback(req, res) {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send("Authorization code not provided");
    } else if (req.session.user) {
      return res.redirect('/');
    }
    const requestBody = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      client_id: oauthConfig.clientId,
      client_secret: oauthConfig.clientSecret,
      redirect_uri: oauthConfig.redirectUri,
    });
    
    let intraUser;
    let account = {}
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
      const accessToken = response.data.access_token;
      intraUser = await getIntraUser(accessToken);
      isActive(intraUser);
      isFromCampus(intraUser);
      account['admin?'] = getAdminStatus(intraUser);
      account.id = intraUser.id;
      account.login = intraUser.login;
      account.cursusEnd = getCursusEnd(intraUser, account["admin?"]);
      const coalition = await getCoalitionUser(intraUser, accessToken, account["admin?"]);
      account.coalition = coalition.name;
      account.coalitionId = coalition.id;
      account.coalitionImg = coalition.img;
      account.coalitionUserId = coalition.coalitionUserId;
      account.poolYear = intraUser.pool_year;
      account.poolMonth = intraUser.pool_month;
      account.img = intraUser.image.link;

      const filter = {id: account.id, login: account.login};
      const options = { new: true, upsert: true };
      const user = await Profile.findOneAndUpdate(filter, account, options);
      console.log(`User ${user.login} logged in. (${user.coalition})`);
      req.session.user = {
        id: intraUser.id,
        login: intraUser.login,
      };
      res.redirect('/');
    } catch (err) {
      console.error(
        "Error retrieving access token:",
        err.response ? err.response.data : err.message,
      );
      if (err.code)
        return res.status(err.code).send(err.message);
      res.status(500).send("Error retrieving access token");
    }
}


function getAdminStatus(intraUser) {
  for (const admin of administrators) {
    if (admin.login === intraUser.login && admin.id === intraUser.id)
      return true;
  }
  return false;
}

function isActive(intraUser) {
  if (intraUser['active?'] === true) {
    return;
  }
  const err = new Error("You do not have an Active cursus");
  err.code = 403;
  throw err;
}

function isFromCampus(intraUser) {
  
  for (const campus of intraUser.campus) {
    if (campus.id === userSettings.campus) {
      return;
    }
  }
  const err = new Error("You are not part of 42Lyon");
  err.code = 403;
  throw err; 
}

async function getCoalitionUser(intraUser, accessToken, admin) {
  const response = await fetch(
    `https://api.intra.42.fr/v2/users/${intraUser.id}/coalitions_users`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const coalitions = await response.json();
  const coalitionUser = coalitions.find((entry) =>
    userSettings.coalitionsIds.find((id) => id === entry.coalition_id)
  );
  console.log(coalitionUser);
  if (coalitionUser) {
    return getCoalitionData(coalitionUser);
  } else {
    return null;
  }
}

function getCoalitionData(coalitionUser)
{
  for (let i = 0; i < coalitions.length; i++) {
    if (coalitions[i].id === coalitionUser.coalition_id) {
      return {
        id: coalitions[i].id,
        name: coalitions[i].name,
        logo: coalitions[i].img,
        coalitionUserId: coalitionUser.id
      }
    }
  }
    const err = new Error("You do not have a Piscine coalition");
    err.code = 403;
    throw err; 
}

function getCursusEnd(intraUser, admin) {
  const cursus = intraUser.cursus_users.find((cursus) => cursus.cursus_id === userSettings.cursus.id)
  if (cursus !== undefined) {
    return cursus.end_at;
  }
  else if (admin)
    return NaN;
  const err = new Error("You do not have an active Piscine cursus");
  err.code = 403;
  throw err;
}
