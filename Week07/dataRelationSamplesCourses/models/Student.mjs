import { default as mongoose } from "mongoose";
const Schema = mongoose.Schema;

var StudentSchema = new Schema({
  name: { type: String },

  //Student stores a list of courses they are taking
  relatedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

export default mongoose.model("Student", StudentSchema);