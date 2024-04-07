import { default as mongoose } from "mongoose";
const Schema = mongoose.Schema;

var BSchema = new Schema({
  name: { type: String },
});

export default mongoose.model("B", BSchema);
