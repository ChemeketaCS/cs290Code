import {default as mongoose} from 'mongoose';
const Schema = mongoose.Schema;

var ASchema = new Schema({
  name: { type: String },

  
  //A knows about the one B it is related to
  relatedB: { type: Schema.Types.ObjectId, ref: "B" },
});

//Export model
module.exports = mongoose.model("A", ASchema);
