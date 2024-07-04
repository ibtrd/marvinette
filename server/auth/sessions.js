const MongoStore = require("connect-mongo");
const session = require("express-session");

const sessionsStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  ttl: 7 * 24 * 60 * 60, // 7 days
  autoRemove: "native",
});

const sessionMiddleware = session({
  store: sessionsStore,
  secret: process.env.SESSIONS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
  },
});

module.exports =  { sessionsStore, sessionMiddleware };