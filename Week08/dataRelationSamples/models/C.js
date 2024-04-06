import {default as mongoose} from 'mongoose';
const Schema = mongoose.Schema;

var CSchema = new Schema({
  name: { type: String },
  
  //C knows about all the A's it is related to
  relatedAs: [{ type: Schema.Types.ObjectId, ref: "A" }],
});

//Export model
module.exports = mongoose.model("C", CSchema);
