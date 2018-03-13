const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchSchema = new Schema({
  branch: String
});

module.exports = mongoose.model("Branch", branchSchema);
