const mongoose = require("mongoose");
const Profile = require("../mongo_models/Profile");

async function wipeDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/42roulette")
  .then(() => {console.log('Connected to MongoDB');})
  .catch((err) => {console.error('MongoDB connection error:', err);});
  const users = await Profile.deleteMany();
  console.log(`Database wiped: ${users.deletedCount}`);
  mongoose.disconnect();
  return;
}

wipeDB().catch((err) => {
  console.log(err);
});
