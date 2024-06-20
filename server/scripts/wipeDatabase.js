const mongoose = require("mongoose");
const User = require("../mongo_models/User");

async function wipeDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/42roulette")
  .then(() => {console.log('Connected to MongoDB');})
  .catch((err) => {console.error('MongoDB connection error:', err);});
  const users = await User.deleteMany();
  console.log(`Database wiped: ${users.deletedCount}`);
  mongoose.disconnect();
  return;
}

wipeDB().catch((err) => {
  console.log(err);
});
