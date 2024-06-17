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
  user.cursus_users.forEach(async cursus => {
  if (cursus.id === 9 && cursus.end_at > Date.now())
  {
    if (cursus.has_coalition === true)
    {
      const response = await fetch(`https://api.intra.42.fr/v2/users/${user.id}/coalitions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      const coalition = await response.json();
      return coalition.name;
    } else {
      return (null);
    }
  }
  return (false);
});
  console.log(user.cursus_users);
  if (user.cursus_users[0].has_coalition === true)
  {
    
  }
  return null;
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
