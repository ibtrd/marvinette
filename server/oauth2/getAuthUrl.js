const { oauthConfig } = require('./config');

module.exports.getAuthUrl = function getAuthUrl() {
    oauthConfig
  const { clientId, redirectUri, authorizationEndpoint, scopes } = oauthConfig;
  const scope = scopes.join(" ");
  return `${authorizationEndpoint}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
}