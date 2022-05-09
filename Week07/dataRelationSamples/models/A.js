const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ASchema = new Schema({
  name: { type: String },
  relatedB: { type: Schema.Types.ObjectId, ref: "B" },
  relatedCs: [{ type: Schema.Types.ObjectId, ref: "C" }],
});

//Export model
module.exports = mongoose.model("A", ASchema);
