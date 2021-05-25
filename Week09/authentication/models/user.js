const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
});

//Export model
module.exports = mongoose.model("User", UserSchema);
