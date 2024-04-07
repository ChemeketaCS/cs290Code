import { default as mongoose } from 'mongoose';
const Schema = mongoose.Schema;

let HeroSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  secretIdentity: { type: String, required: true },
  powers: [{ type: String }],
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
});

HeroSchema.virtual('url').get(function () {
  return '/heroes/id/' + this._id;
});

HeroSchema.virtual('last_first').get(function () {
  let spaceLoc = this.name.indexOf(' ');
  if (spaceLoc === -1) return this.name;
  else
    return this.name.slice(spaceLoc + 1) + ', ' + this.name.slice(0, spaceLoc);
});

// Make a model from the Schema for the type 'Hero' and export that
export default mongoose.model('Hero', HeroSchema);