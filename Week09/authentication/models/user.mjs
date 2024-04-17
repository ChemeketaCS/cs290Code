import { default as mongoose } from "mongoose";
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
});

export default mongoose.model("User", UserSchema);
