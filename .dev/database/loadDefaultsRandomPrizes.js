require("dotenv").config();

const mongoose = require("mongoose");
const RandomPrizes = require("../../server/mongo_models/RandomPrizes");

const RANGE = "[PRIZES]!A2:D";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/values/${RANGE}?key=${process.env.APIGOOGLE_KEY}`;

async function main() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
  await loadDefaults();
  mongoose.disconnect().then(() => console.log("Disconected from MongoDB"));
}

main().catch((err) => {
  console.log(err);
});

async function loadDefaults() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const prizes = data.values.map((row) => {
      return {
        id: parseInt(row[0]),
        category: row[1],
        title: row[2],
        message: row[3],
      };
    });
    for (const prize of prizes) {
      const loaded = await RandomPrizes.findOneAndUpdate({ id: prize.id }, prize, {
        upsert: true,
        returnDocument: "after",

      });
      console.log("Loaded:", {
        id: loaded.id, 
        category: loaded.category, 
        title: loaded.title, 
        message: loaded.message
    });
    }
  } catch (err) {
    console.error(err);
  }
};
