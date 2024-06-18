const { piscineCursusId } = require("./config");

module.exports.getUser = async function getUser(accessToken) {
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
  // if (user.login === 'ibertran')
  //   return ('admin');
  if (user.active === false)
    return false;

  for (var i = 0; i < user.cursus_users.length; i++) {
    const cursus = user.cursus_users[i];
    if (cursus.cursus_id === 9 && new Date(cursus.end_at) < Date.now()) {
      if (cursus.has_coalition === true) {
        const response = await fetch(
          `https://api.intra.42.fr/v2/users/${user.id}/coalitions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }
        console.log('ok');
        const coalition = await response.json();
        return found.name;
      } else {
        return null;
      }
    }
  };
  return (false);
}

// module.exports.getCoalition = async function getCoalition(accessToken, userId ) {
//   const response = await fetch(`https://api.intra.42.fr/v2/users/${userId}/coalitions`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error(
//       `Failed to fetch data: ${response.status} ${response.statusText}`
//     );
//   }
//   const coaltion = await response.json();
//   return coalition.name;
// }
