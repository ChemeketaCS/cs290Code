const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var DSchema = new Schema({
  name: { type: String },
});

var ESchema = new Schema({
  name: { type: String },
  Ds: [{ type: DSchema }],
});

//Export model
module.exports = mongoose.model("E", ESchema);
