import { default as mongoose } from "mongoose";
const Schema = mongoose.Schema;

var HeroSchema = new Schema({
  name: {
    type: String,
    required: [true, "You must provide a Name"],
    validate: [
      function (value) {
        let matchLocation = value.search(/\w/);
        return matchLocation !== -1;
      },
      "There must be at least one alphanumeric character",
    ],
  },
  age: {
    type: Number,
    required: [true, "You must provide an Age"],
    min: [0, "Minimum Age is 0"],
  },
  secretIdentity: { type: String },
  powers: {
    type: [{ type: String }],
    validate: [
      function (value) {
        return value.length <= 6;
      },
      "There is a limit of 6 powers",
    ],
  },
  team: { type: Schema.Types.ObjectId, ref: "Team" },
});

HeroSchema.virtual("url").get(function () {
  return "/heroes/id/" + this._id;
});

HeroSchema.virtual("last_first").get(function () {
  let spaceLoc = this.name.indexOf(" ");
  if (spaceLoc === -1) return this.name;
  else
    return this.name.slice(spaceLoc + 1) + ", " + this.name.slice(0, spaceLoc);
});

// Make a model from the Schema for the type 'Hero' and export that
export default mongoose.model('Hero', HeroSchema);