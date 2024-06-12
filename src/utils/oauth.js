import { oauthConfig } from "../config";

export function getAuthUrl() {
  const { clientId, redirectUri, authorizationEndpoint, scopes } = oauthConfig;
  const scope = scopes.join(" ");
  console.log(
    `${authorizationEndpoint}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
  );
  return `${authorizationEndpoint}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
}
