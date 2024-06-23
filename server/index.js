require('dotenv').config();

const express = require('express');
const rateLimit = require('express-rate-limit')
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const { rouletteInterval } = require('./roulette/rouletteCells'); 
const initSettings = require('./settings/initSettings');

const app = express();

// const limiter = rateLimit({
//     windowMs: 1000,
//     max: 20,
//     message: "TU SPAM TROP CONNARD"
// })
// app.use(limiter);


const corsOptions = {
    origin: process.env.HOST,
    credentials: true,
    optionSucessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}));

app.use(cookieParser());


// Configure routes

async function main() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => {console.log('Connected to MongoDB');})
        .catch((err) => {console.error('MongoDB connection error:', err);});
        // Configure sessions
        app.use(
          session({
            secret: process.env.SESSIONS_SECRET,
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
              mongoUrl: process.env.MONGO_URI,
              ttl: 7 * 24 * 60 * 60,
              autoRemove: "native",
            }),
            cookie: {
              secure: process.env.NODE_ENV === "production",
              httpOnly: true,
              sameSite: "lax",
              maxAge: 7 * 24 * 60 * 60 * 1000, //7 Days
            },
          })
        );
        app.use('/', router);
        await initSettings();
    } catch (err) {
        console.error(err);
    }
        await rouletteInterval().then( () => console.log('Wheel loaded form Google Sheets'));
        const port = 3000;
        const server = app.listen(port, () => console.log(`Server is running on port ${port}`));
}

main();