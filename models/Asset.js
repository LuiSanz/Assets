const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetSchema = new Schema({
  brand: {
    type: String
  },
  model: {
    type: String
  },
  assetType: {
    type: String
  },
  serial: {
    type: String
  },
  status: {
    type: String
  },
  assignedTo: {
    type: String
  },
  comment: {
    type: String
  },
  greenTag: String,
  location: String,
  branch: String
});

module.exports = mongoose.model("Asset", assetSchema);
