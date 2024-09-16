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
    302,
    303,
    304,
    305,
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
    id: 154768,
  },
  {
    login: "kunfandi",
    id: 108244
  },
];

const piscineCoalitions = [
  {
    id: 15,
    name: "The Blobfishes",
    img: "/cellsIcons/blobfishes.png",
    color: "#82cce0",
    background: "https://cdn.intra.42.fr/coalition/cover/15/sloths_background.jpg"
  },
  {
    id: 16,
    name: "The Skunks",
    img: "/cellsIcons/skunks.png",
    color: "#6c8946",
    background: "https://cdn.intra.42.fr/coalition/cover/16/skunk_background.jpg"
  },
  {
    id: 17,
    name: "The Worms",
    img: "/cellsIcons/worms.png",
    color: "#eab77f",
    background: "https://cdn.intra.42.fr/coalition/cover/17/worms_background.jpg",
  },
  {
    id: 305,
    name: 'Water',
    img: 'https://cdn.intra.42.fr/coalition/image/305/EAU_v3.svg',
    color: '#326C9C',
    background: 'https://cdn.intra.42.fr/coalition/cover/305/téléchargement__2_.png',

  },
  {
    id: 304,
    name: 'Fire',
    img: 'https://cdn.intra.42.fr/coalition/image/304/FEU_v3.svg',
    background: 'https://cdn.intra.42.fr/coalition/cover/304/image.jpg',
    color: '#FFA142',
  },
  {
    id: 303,
    name: 'Earth',
    img: 'https://cdn.intra.42.fr/coalition/image/303/TERRE_v3.svg',
    color: '#07CD00',
    background: 'https://cdn.intra.42.fr/coalition/cover/303/earth__1_.jpg',
  },
  {
    id: 302,
    name: 'Air',
    img: 'https://cdn.intra.42.fr/coalition/image/302/AIR_v3.svg',
    color: '#93979B',
    background: 'https://cdn.intra.42.fr/coalition/cover/302/air__1_.jpg',
  }
];

module.exports = { oauthConfig, userSettings, administrators, piscineCoalitions };