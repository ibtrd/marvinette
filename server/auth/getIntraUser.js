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
