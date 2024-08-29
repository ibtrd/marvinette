require("dotenv").config();

const mongoose = require("mongoose");
const readline = require("readline");
const Profile = require("../../server/mongo_models/Profile");

function askConfirmation(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
  const pass = "RESET SPINS!";
  const answer = await askConfirmation(
    `>> Enter '${pass}' to confirm deletion `
  );
  if (answer != pass) {
    await mongoose
      .disconnect()
      .then(() => console.log("Disconected from MongoDB"));
    process.exit(1);
  }
  const users = await Profile.find({});
  for (let i = 0; i < users.length; i++) {
    users[i].lastSpin = 0;
    await users[i].save();
  }
  mongoose.disconnect().then(() => console.log("Disconected from MongoDB"));
}

main().catch((err) => {
  console.log(err);
});
