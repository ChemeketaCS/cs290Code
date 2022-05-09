const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var BSchema = new Schema({
  name: { type: String },
  relatedAs: [{ type: Schema.Types.ObjectId, ref: "A" }],
});

//Export model
module.exports = mongoose.model("B", BSchema);
