const mongoose = require("mongoose");

const serverLogsSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    require: true,
    immutable: true,
  },
  category: {
    type: String,
    enum: ["authentification", "reward", "force"],
    required: true,
  },
  message: { type: String, require: true },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    require: true,
  },
  reward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rewards",
  }
});

serverLogsSchema.statics.authentification = async function (profile) {
  try {
    const message = `${profile.login}#${profile.id}`.padStart(15, " ") + ": logged in";
    const entry = new ServerLogs({
      category: 'authentification',
      message,
      profile,
    });
    await entry.save();
    console.log(message);
  } catch (err) {
    console.error('Error saving log entry:', err)
  }
};

serverLogsSchema.statics.reward = async function (profile, reward, index, description, forced) {
  try {
    let message =
      `${profile.login}#${profile.id}`.padStart(15, " ") +
      `: spin#${profile.spins}` +
      `: ${description} (${index})`;
    if (forced)
      message += " FORCED";
    const entry = new ServerLogs({
      category: "reward",
      message,
      profile,
      reward,
    });
    await entry.save();
    console.log(message);
  } catch (err) {
    console.error("Error saving log entry:", err);
  }
};

serverLogsSchema.statics.force = async function (query, target, index, description) {
  try {
    const profile = await query;
    let message =
      `${profile.login}#${profile.id}`.padStart(15, " ") +
      `: FORCED@${target}` +
      `: ${description} (${index})`;
    const entry = new ServerLogs({
      category: "force",
      message,
      profile,
    });
    await entry.save();
    console.log(message);
  } catch (err) {
    console.error("Error saving log entry:", err);
  }
};


const ServerLogs = mongoose.model("ServerLogs", serverLogsSchema);

module.exports = ServerLogs;
