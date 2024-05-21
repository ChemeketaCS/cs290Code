import { default as mongoose } from "mongoose";
const Schema = mongoose.Schema;

var CourseSchema = new Schema({
  name: { type: String },

  //Course stores its 1 instructor
  relatedInstructor: { type: Schema.Types.ObjectId, ref: "Instructor" },
});

export default mongoose.model("Course", CourseSchema);
