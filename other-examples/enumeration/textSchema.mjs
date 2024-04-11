import { default as mongoose } from "mongoose";
const Schema = mongoose.Schema;

//Bring in the "enum"
import { default as ColorEnum } from "./colorEnum.mjs";

//Build up an array of the options - that is what Schema needs
const colorOptions = [];
for (let c in ColorEnum) {
  colorOptions.push(ColorEnum[c]);
}

var TextSchema = new Schema({
  contents: { type: String, required: true },
  color: {
    type: String,
    required: true,
    //enum: ["Red", "Black", "Green", "Blue"],  //Desired format
    enum: colorOptions, //Use data pulled from our enum
  },
});

export default mongoose.model("Text", TextSchema);
