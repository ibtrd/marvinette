const oauthConfig = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
  authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
  tokenEndpoint: "https://api.intra.42.fr/oauth/token",
  scopes: ["public"],
};

const userSettings = {
  campus: 9,
  cursus: {
    id: 9,
    ended: true,
  },
  coalitionBlock: 5,
  coalitionsIds: [
    15,
    16,
    17,
  ]
}

const administrators = [
  {
    login: "ibertran",
    id: 154472,
  },
  {
    login: "bwisniew",
    id: 1,
  },
  {
    login: "kunfandi",
    id: 1,
  },
];

module.exports = { oauthConfig, userSettings, administrators };