import { default as express } from "express";
const router = express.Router();
export default router;

import { default as Hero } from "../models/hero.mjs";

router.get("/", async function (req, res) {
  let heroList = await Hero.find().sort("name").exec();
  //pass an object with one property, the heroList
  res.render("superheroList.ejs", { heroList: heroList });
});

router.get("/byname/:name", async function (req, res) {
  //To use a variable in a regular expression, need to construct
  // it as an object
  let namePatternToMatch = new RegExp(req.params.name, "i");
  let heroList = await Hero.find()
    .where("name")
    .regex(namePatternToMatch)
    .sort("name")
    .exec();

  //pass an object with one property, the heroList
  res.render("superheroList.ejs", { heroList: heroList });
});

router.get("/id/:id", async function (req, res, next) {
  let hero = await Hero.findById(req.params.id)
    .populate("team") //get data of team as well
    .exec();

  // Hero will be undefined if there was no match for the id
  if (hero) {
    // Hero is a Mongoose document. Passing it to the template directly
    // will not work.
    // Option 1: Convert it to a plain JavaScript object using toObject() method
    res.render("superheroSingle.ejs", { hero: hero });
    // Option 2: Create a new object and copy the properties from the Mongoose document
    // res.render("superheroSingle.ejs", {
    //   _id: hero._id,
    //   name: hero.name,
    //   secretIdentity: hero.secretIdentity,
    //   powers: hero.powers,
    //   team: hero.team ? hero.team.name : "No Team",
    // });
  } else {
    next(); //pass this on to next handler (404)
  }
});

router.get("/delete/:id", async function (req, res) {
  //Team doesn't really know about hero, so just delete hero
  await Hero.findByIdAndDelete(req.params.id).exec();
  //Send the user back to the heroes page
  res.redirect("/heroes/");
});