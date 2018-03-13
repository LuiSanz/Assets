const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetTypeSchema = new Schema({
  assetType: {
    type: String
  }
});

module.exports = mongoose.model("AssetType", assetTypeSchema);
