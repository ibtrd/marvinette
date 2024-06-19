const { piscineCursusId } = require("./config");

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
  if (user['staff?'] === true) return ('staff');
  // if (user.login === 'ibertran' || user.login === 'bwisniew') return ('admin')
  if (user['active?'] === false) return false;
  if (isFromCampus(user) === false) return false;
  const cursus = getPiscineCursus(user);
  console.log(cursus);
  if (cursus === null) return false;
  if (cursus.has_coalition === true) {
    console.log('has coa');
  } else {
    return (null);
  }


  //       const response = await fetch(`https://api.intra.42.fr/v2/blocs?filter[campus_id]=9/`, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  //       if (!response.ok) {
  //         throw new Error(
  //           `Failed to fetch data: ${response.status} ${response.statusText}`
  //         );
  //       }
  //       const coalitions = await response.json();
  //       // coalitions.forEach(element => { console.log(element.coalitions)});
  //       const found = coalitions.find(
  //         (coa) => (coa.id == 17 || coa.id == 17 || coa.id == 17));
  //       console.log(found.name);
  //       return found.name;
  //     } else {
  //       return null;
  //     }
  //   }
  // };
  // return (false);
}

function isFromCampus(user) {
  for (var i = 0; i < user.campus.length; i++) {
    if (user.campus[i].id === 9) {
      return true;
    }
  }
  return false;
}

function getPiscineCursus(user) {
  for (var i = 0; i < user.cursus_users.length; i++) {
    const cursus = user.cursus_users[i];
    if (cursus.cursus_id === 9 && new Date(cursus.end_at) < Date.now()) {
      return cursus;
    }
  }
  return null;
}

function getPiscineCoalition() {
  ;
}
