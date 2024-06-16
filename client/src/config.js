export const oauthConfig = {
  clientId: process.env.REACT_APP_API42_CLIENT_ID,
  clientSecret: process.env.REACT_APP_API42_CLIENT_SECRET,
  redirectUri: process.env.REACT_APP_API42_REDIRECT_URI,
  authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
  tokenEndpoint: "https://api.intra.42.fr/oauth/token",
  scopes: ["public"],
};
