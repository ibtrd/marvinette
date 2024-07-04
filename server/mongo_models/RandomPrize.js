const mongoose = require("mongoose");

const randomPrizeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  stock: { type: Number, default: -1 },
});

randomPrizeSchema.static.addOne = async function (type, message, stock) {
    this.create({
        type,
        message,
        stock
    });
}

const RandomPrize = mongoose.model("Rewards", randomPrizeSchema);

module.exports = RandomPrize;
