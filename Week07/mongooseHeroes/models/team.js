const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TeamSchema = new Schema({
  squadName: { type: String, required: true },
  homeTown: { type: String, required: true },
  formed: { type: Date },
  active: { type: Boolean, required: true, default: true },
});

TeamSchema.virtual("url").get(function () {
  return "/teams/id/" + this._id;
});

//Provide a way to get a prettier version of the formed date
TeamSchema.virtual("formed_short").get(function () {
  const d = this.formed;
  //js uses 0 indexed months and 1 indexed days
  let dateString = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
  return dateString;
});

//A team does not know about its members. For convenience,
// provide a property to look them up. Must be async to
// await necessary DB query
TeamSchema.virtual("members").get(async function () {
  const Hero = require("./hero");
  let heroArray = await Hero.find().where("team").equals(this._id).exec();
  return heroArray;
});

//Export model
module.exports = mongoose.model("Team", TeamSchema);
