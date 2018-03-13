const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  brand: {
    type: String
  }
});

module.exports = mongoose.model("Brand", brandSchema);
