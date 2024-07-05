require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const { sessionMiddleware } = require('./auth/sessions');
const router = require('./routes/router');
const initSettings = require('./settings/initSettings');
const { rouletteInterval } = require('./roulette/rouletteCells'); 
const RandomPrizes = require('./mongo_models/RandomPrizes');

const app = express();

// Enable CORS
app.use(cors({
  origin: process.env.HOST,
  credentials: true,
  optionsSuccessStatus: 200,
}));

// Enable JSON bodies
app.use(bodyParser.json()); 

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({extended:false}));

// Parse cookies
app.use(cookieParser());

// Configure sessions
app.use(sessionMiddleware);

// Configure routes
app.use("/", router);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    // Initialisation
    await initSettings();
    await RandomPrizes.loadDefaults();
    await rouletteInterval().then(() =>
      console.log("Wheel loaded form Google Sheets"))
    // Starts server
    const port = 3000;
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });