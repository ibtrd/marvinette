const axios = require('axios');
const { oauthConfig, administrators, userSettings } = require("../oauth/config");
const { getIntraUser } = require("../oauth/getIntraUser");
const Profile = require('../mongo_models/Profile');


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
      isFromCampus(intraUser);
      account['admin?'] = getAdminStatus(intraUser);
      account.id = intraUser.id;
      account.login = intraUser.login;
      account.cursusEnd = getCursusEnd(intraUser, account["admin?"]);
      account.coalition = await getCoalition(intraUser, accessToken, account["admin?"]);
      account.poolYear = intraUser.pool_year;
      account.poolMonth = intraUser.pool_month;
      account.img = intraUser.image.link;

      const filter = {id: account.id, login: account.login};
      const options = { new: true, upsert: true };
      console.log("LOGGED-IN:", await Profile.findOneAndUpdate(filter, account, options));
      req.session.user = {
        id: intraUser.id,
        login: intraUser.login,
      };
      res.redirect('/');
    } catch (err) {
      console.error(
        "Error retrieving access token:",
        err.response ? err.response.data : err.message,
        `[login: ${intraUser.login} id: ${intraUser.id}]`
      );
      if (err.code)
        return res.status(err.code).send(err.message);
      res.status(500).send("Error retrieving access token");
    }
}

async function addUser(intraUser, coalition) {
  var user = await Profile.findOne({ id: intraUser.id });
  if (user) {
    if (user.coalition === null && coalition !== null) {
      user.coalition = coalition;
      await user.save();
      console.log(`Updated user: ${intraUser.login} (${coalition})`);
    }
    return;
  }
  user = await Profile.create(account);
  console.log(`New user created: ${intraUser.login} (${coalition})`);
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

async function getCoalition(intraUser, accessToken, admin) {
  try {
    const response = await fetch(
      `https://api.intra.42.fr/v2/users/${intraUser.id}/coalitions`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const coalitions = await response.json();
    const coalition = coalitions.find((coa) =>
      userSettings.coalitionsIds.find((id) => id === coa.id)
    );
    return coalition.name;
  } catch (yeeted) {
    console.error(yeeted);
    const err = new Error("Error fetching 42API");
    err.code = 502;
    throw err;
  }
}

function getCursusEnd(intraUser, admin) {
  const cursus = intraUser.cursus_users.find((cursus) => cursus.cursus_id === userSettings.cursus.id)
  if (cursus != undefined) {
    return cursus.end_at;
  }
  else if (admin)
    return NaN;
  const err = new Error("You do not have an active Piscine cursus");
  err.code = 403;
  throw err;
}