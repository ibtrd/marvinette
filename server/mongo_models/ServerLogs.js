const mongoose = require("mongoose");
const logsConfig = require("../settings/logsConfig.json");

const serverLogsSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    require: true,
    immutable: true,
  },
  category: {
    type: String,
    enum: logsConfig.categories,
    required: true,
  },
  message: {
    type: String,
    require: true
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
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

serverLogsSchema.statics.authentificationFailure = async function (login, id) {
  try {
    const message =
      `${login}#${id}`.padStart(15, " ") + ": tried to log in";
    const entry = new ServerLogs({
      category: "authentificationFailure",
      message,
    });
    await entry.save();
    console.log(message);
  } catch (err) {
    console.error("Error saving log entry:", err);
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
      category: "admin",
      message,
      profile,
    });
    await entry.save();
    console.log(message);
  } catch (err) {
    console.error("Error saving log entry:", err);
  }
};

serverLogsSchema.statics.setting = async function (query, key, value) {
  try {
    const profile = await query;
    let message =
      `${profile.login}#${profile.id}`.padStart(15, " ") +
      `: SET@${key}` +
      `: ${value}`;
    const entry = new ServerLogs({
      category: "admin",
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
