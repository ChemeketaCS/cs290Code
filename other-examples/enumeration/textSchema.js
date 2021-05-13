const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Bring in the "enum"
const ColorEnum = require("./colorEnum.js");

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

module.exports = mongoose.model("Text", TextSchema);
