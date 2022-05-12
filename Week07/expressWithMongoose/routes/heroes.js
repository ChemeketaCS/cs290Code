var express = require("express");
var router = express.Router();

const Hero = require("../models/hero");

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

router.get("/id/:id", async function (req, res) {
  let hero = await Hero.findById(req.params.id)
    .populate("team") //get data of team as well
    .exec();
  //pass the hero itself to the view
  res.render("superheroSingle.ejs", hero);
});

router.get("/delete/:id", async function (req, res) {
  //Team doesn't really know about hero, so just delete hero
  await Hero.findByIdAndDelete(req.params.id).exec();
  //Send the user back to the heroes page
  res.redirect("/heroes/");
});

module.exports = router;
