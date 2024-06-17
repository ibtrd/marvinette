const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const { rouletteInterval } = require('./roulette/rouletteCells') 

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}));

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSucessStatus: 200
}
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(session({
    secret: crypto.randomBytes(64).toString('base64'),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 604800000 } // Set secure: true in production for HTTPS
}));

app.use('/', router);

const port = 4000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    rouletteInterval();
});

