require("dotenv").config();

const mongoose = require("mongoose");
const Rewards = require("../../server/mongo_models/Rewards");

async function main() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
  const result = await Rewards.deleteMany({});
  console.log(`deleted: ${result.deletedCount}`);
  mongoose.disconnect().then(() => console.log("Disconected from MongoDB"));
}

main().catch((err) => {
  console.log(err);
});
