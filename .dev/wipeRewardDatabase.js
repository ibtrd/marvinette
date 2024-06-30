require('dotenv').config();

const mongoose = require("mongoose");
const Rewards = require('../server/mongo_models/Rewards');

async function wipeDB() {
  await mongoose.connect(process.env.MONGO_URI)
  .then(() => {console.log('Connected to MongoDB');})
  .catch((err) => {console.error('MongoDB connection error:', err);});
  const users = await Rewards.deleteMany();
  console.log(`Reward database wiped: ${users.deletedCount}`);
  mongoose.disconnect();
  return;
}

wipeDB().catch((err) => {
  console.log(err);
});