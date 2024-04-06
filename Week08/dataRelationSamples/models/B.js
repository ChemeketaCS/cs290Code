import {default as mongoose} from 'mongoose';
const Schema = mongoose.Schema;

var BSchema = new Schema({
  name: { type: String },
});

//Export model
module.exports = mongoose.model("B", BSchema);
