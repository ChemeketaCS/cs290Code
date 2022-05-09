const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CSchema = new Schema({
  name: { type: String },
});

//Export model
module.exports = mongoose.model("C", CSchema);
