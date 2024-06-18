require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const { rouletteInterval } = require('./roulette/rouletteCells') 

async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/42roulette");
}

connectDB().catch((err) => {
    console.log(err)
    return;
});

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSucessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}));

app.use(cookieParser());
app.use(session({
    secret: crypto.randomBytes(64).toString('base64'),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 604800000
    } // Set secure: true in production for HTTPS
}));

app.use('/', router);

const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    rouletteInterval();
});

