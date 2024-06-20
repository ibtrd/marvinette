const { piscineCursusId, userSettings } = require("./config");

module.exports.getIntraUser = async function getIntraUser(accessToken) {
  const response = await fetch(`https://api.intra.42.fr/v2/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
}

module.exports.isPiscineux = async function isPiscineux(accessToken, user) {
  if (user['staff?'] === true) {
    return {group: 'staff'};
  };
  // if (user.login === 'ibertran' || user.login === 'bwisniew') {
  //   return {group: 'admin'};
  // };
  if (user['active?'] === false) {
    return {group: false, message: "You do not have an active cursus"};
  }
  if (isFromCampus(user) === false) {
    return {group: false, message: "You are not part of 42Lyon"};
  }
  const cursus = getCursus(user);
  if (cursus === null) {
    return {group: false, message: "You do not have an active Piscine"};
  }
  return {group: getCoalition(accessToken, user)};
}

function isFromCampus(user) {
  for (var i = 0; i < user.campus.length; i++) {
    if (user.campus[i].id === userSettings.campus) {
      return true;
    }
  }
  return false;
}

function getCursus(user) {
  for (var i = 0; i < user.cursus_users.length; i++) {
    const cursus = user.cursus_users[i];
    if (cursus.cursus_id === userSettings.cursus.id
      && new Date(cursus.end_at) < Date.now() === userSettings.cursus.ended) {
      return (cursus);
    }
  }
  return null;
}

async function getCoalition(accessToken, user) {
  const response = await fetch (`https://api.intra.42.fr/v2/users/${user.id}/coalitions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    return {group: false, message: "Authentification failed"};
  }
  const coalitions = await response.json();
    const userCoalition = coalitions.find(
      (coa) => (userSettings.coalitionsIds.find(id => id === coa.id)));
        console.log(userCoalition.name);
}
