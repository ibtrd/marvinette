const mongoose = require("mongoose");
const defaultPrizes = require("../randomPrizes/defaultPrizes");

const randomPrizesSchema = new mongoose.Schema({
  defaultId: { type: Number, unique: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  stock: { type: Number, default: -1 },
});

// randomPrizesSchema.static.addOne = async function (type, message, stock) {
//     this.create({
//         type,
//         message,
//         stock
//     });
// }

randomPrizesSchema.statics.loadDefaults = async function () {
  for (const prize of defaultPrizes) {
    await this.findOneAndUpdate({ defaultId: prize.id }, prize, {
      upsert: true,
      setDefaultsOnInsert: true,
    });
  }
};

randomPrizesSchema.statics.getOne = async function () {
  const query = await this.find({ stock: { $ne: 0 }});
  if (!query || query.length === 0)
    return ("Sorry, try again next time"); 
  const selected = query[Math.floor(Math.random() * query.length)];
  console.log(selected);
  if (selected.stock === -1) {
    return (selected.type + ': ' + selected.message);
  }
  selected.stock--;
  await selected.save();
  return selected.type + ': ' + selected.message;
};

const RandomPrizes = mongoose.model("RandomPrizes", randomPrizesSchema);

module.exports = RandomPrizes;
