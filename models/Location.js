const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  location: String
});

module.exports = mongoose.model("Location", locationSchema);
