const mongoose = require("mongoose");
const getDefaultPrizes = require("../randomPrizes/defaultPrizes");

const randomPrizesSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  category: { type: String, required: true },
  title: { type: String },
  message: { type: String, required: true },
  stock: { type: Number, default: -1 },
});

randomPrizesSchema.statics.loadDefaults = async function () {
  for (const prize of await getDefaultPrizes()) {
    await this.findOneAndUpdate({ id: prize.id }, prize, {
      upsert: true,
      setDefaultsOnInsert: true,
    });
  }
};

randomPrizesSchema.statics.getOne = async function (category) {
  const query = await this.find({ category , stock: { $ne: 0 }});
  if (!query || query.length === 0)
    return ({
      description: "Sorry, try again next time",
    }); 
  const selected = query[Math.floor(Math.random() * query.length)];
  if (selected.stock > 0) {
    selected.stock--;
    await selected.save();
  }
  return ({
    title: selected.title,
    description: selected.message,
  });
};

const RandomPrizes = mongoose.model("RandomPrizes", randomPrizesSchema);

module.exports = RandomPrizes;
