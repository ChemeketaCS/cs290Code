import { default as mongoose } from "mongoose";
const Schema = mongoose.Schema;

var TeamSchema = new Schema({
  squadName: { type: String, required: [true, "You must provide a Team Name"] },
  homeTown: {
    type: String,
    required: [true, "You must provide a Hometown"],
    minlength: [3, "Hometown must be 3 characters or more"],
  },
  formed: {
    type: Date,
    default: Date.now(),
    required: [true, "You must provide a Date formed"],
    max: [Date.now(), "Formed may not be set to the future"],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

TeamSchema.virtual("url").get(function () {
  return "/teams/id/" + this._id;
});

//Provide a way to get a prettier version of the formed date
TeamSchema.virtual("formed_short").get(function () {
  let d = this.formed;
  //js uses 0 indexed months and 1 indexed days!?!?!
  let monthNum = d.getMonth() + 1;
  //days are 1 indexed - but need to ask for UTC date to avoid timezone issues
  let dayNum = d.getUTCDate();
  let dateString = monthNum + "/" + dayNum + "/" + d.getFullYear();
  return dateString;
});

//Get date in HTML preferred YYYY-MM-DD
TeamSchema.virtual("formed_html").get(function () {
  const d = this.formed;
  //ISO format is "YYYY-MM-DDTHH:mm:ss.sssZ" where the T separates date from time
  let dateString = d.toISOString();
  dateString = dateString.slice(0, dateString.indexOf("T"));
  return dateString;
});

//A team does not know about its members. For convenience,
// provide a property to look them up. Must be async to
// await necessary DB query
import { default as Hero } from "./hero.mjs";
TeamSchema.virtual("members").get(async function () {
  let heroArray = await Hero.find().where("team").equals(this._id).exec();
  return heroArray;
});

// Make a model from the Schema for the type 'Team' and export that
export default mongoose.model('Team', TeamSchema);