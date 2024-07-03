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
    login: "ibertran", //154472
    id: 154472,
  },
  {
    login: "bwisniew", //154768
    id: 154768,
  },
  {
    login: "kunfandi",
    id: 108244
  },
];

const coalitions = [
  {
    id: 15,
    name: "The Blobfishes",
    img: "/cellsIcons/blobfishes.png",
  },
  {
    id: 16,
    name: "The Skunks",
    img: "/cellsIcons/skunks.png",
  },
  {
    id: 17,
    name: "The Worms",
    img: "/cellsIcons/worms.png",
  },
];

module.exports = { oauthConfig, userSettings, administrators, coalitions };