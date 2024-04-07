import { default as mongoose } from "mongoose";
const Schema = mongoose.Schema;

var CSchema = new Schema({
  name: { type: String },

  //C knows about a list of A's it is related to
  relatedAs: [{ type: Schema.Types.ObjectId, ref: "A" }],
});

export default mongoose.model("C", CSchema);