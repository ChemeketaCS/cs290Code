import { default as mongoose } from "mongoose";
const Schema = mongoose.Schema;

var InstructorSchema = new Schema({
  name: { type: String },
});

export default mongoose.model("Instructor", InstructorSchema);
