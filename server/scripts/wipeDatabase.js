const mongoose = require("mongoose");
const { User } = require("../mongo_models/User");

async function wipeDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ft_wordle");
  const users = await User.deleteMany({});
  console.log(`Database wiped: ${users.deletedCount}`);
  return;
}

wipeDB().catch((err) => {
  console.log(err);
});