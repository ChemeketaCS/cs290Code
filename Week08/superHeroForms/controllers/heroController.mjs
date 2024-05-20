// Functions to generate pages for hero routes
import * as routeHelper from '../routes/routeHelpers.mjs';

//Use express-validator to remove harmful content
import { default as validator } from 'express-validator';

import { default as Hero } from '../models/hero.mjs';
import { default as Team } from '../models/team.mjs';

//All heroes
async function heroList(req, res, next) {
  try {
    let heroList = await Hero.find().sort("name").exec();
    res.render("superheroList.ejs", { heroList });
  } catch (err) {
    next(err);
  }
};

//Get list by partial name match
async function heroListByName(req, res, next) {
  try {
    //To use a variable in a regular expression, need to construct
    // it as an object
    let namePatternToMatch = new RegExp(req.params.name, "i");
    let heroList = await Hero.find()
      .where("name")
      .regex(namePatternToMatch)
      .sort("name")
      .exec();

    //pass an object with one property, the heroList
    res.render("superheroList.ejs", { heroList });
  } catch (err) {
    next(err);
  }
};

//Single hero by id
async function heroById(req, res, next) {
  try {
    let hero = await Hero.findById(req.params.id)
      .populate("team") //get data of team as well
      .exec();
    //pass the hero itself to the view
    if(hero)
      res.render("superheroSingle.ejs", hero);
    else 
      next();  //continue to 404
  } catch (err) {
    next(err);  //pass error on
  }
};

//Add a new hero
async function createHero(req, res, next) {
  try {
    //Make a Hero Team object just to get any default values
    // and to have the right properties for the form
    let hero = new Hero({});

    //Need all the team names to implement selection controls
    let teams = await Team.find().select("squadName").exec();

    res.render("superheroForm.ejs", {
      title: "Create Hero",
      hero: hero,
      teams: teams,
    });
  } catch (err) {
    next(err);
  }
};

//Get an existing hero to edit
async function update_get(req, res, next) {
  try {
    let hero = await Hero.findById(req.params.id).exec();
    //Need all the team names to implement selection controls
    let teams = await Team.find().select("squadName").exec();

    res.render("superheroForm.ejs", {
      title: `Update ${hero.name}`,
      hero: hero,
      teams: teams,
    });
  } catch (err) {
    next(err);
  }
};

//Handles submission of the form - it has a list of functions that will be run
const update_post = [
  // //First HTML escape all the text inputs
  validator.body("name").escape(),                  //function call to sanitize the name input
  validator.body("secretIdentity").escape(),        //sanitize secret identity
  validator.body("powers").escape(),                //sanitize powers
  async function (req, res, next) {
    //now run my handler
    try {
      //If team exists in DB, fetch it
      let hero = await Hero.findById(req.params.id).exec();
      //If not, make one
      if (hero === null)
        hero = new Hero({
          _id: req.body.id,
        });

      console.log("req.body:", req.body);

      //Process Powers Input - split string into an array
      let powersStrings = req.body.powers.split("\n");
      let powersList = [];
      for (let powerString of powersStrings) {
        //get rid of extra whitespace at begin/end
        powerString = powerString.trim(); 
        if (powerString !== "")
          powersList.push(powerString);
      }

      //Replace existing data
      hero.name = req.body.name;
      hero.secretIdentity = req.body.secretIdentity;
      hero.age = req.body.age;
      //If team is not empty, use that value, otherwise clear it out
      hero.team = req.body.team !== "" ? req.body.team : undefined;
      hero.powers = powersList;

      //Just print some of the "fake" team info to console
      //----------------------------------------------------------
      //Get from select list:
      console.log("You fake selected");
      console.log(req.body.teamFake);
      //Get from checkboxes - will be string if one, array if multiple
      //So first force into an array. Concat will smash either the string or
      // array elements into an empty array
      let fakeData2 = [].concat(req.body.teamFake2);
      console.log("You fake selected");
      console.log(fakeData2);
      //Get from multiselect select list - same idea as checkboxes
      let fakeData3 = [].concat(req.body.teamFake3);
      console.log("You fake selected");
      console.log(fakeData3);
      //----------------------------------------------------------

      let teams = await Team.find().select("squadName").exec();
      //Try to save it
      hero
        .save()
        .then((hero) => {
          //Success, redirect to details view of hero
          res.redirect(hero.url);
        })
        .catch((err) => {
          //Problem, show the form with error messages
          console.log(err.message);
          res.render("superheroForm.ejs", {
            title: `Update ${hero.name}`,
            hero: hero,
            teams: teams,
            errors: routeHelper.errorParser(err.message),
          });
        });
    } catch (err) {
      next(err);
    }
  },
];

async function deleteHero(req, res) {
  //Team doesn't really know about hero, so just delete hero
  await Hero.findByIdAndDelete(req.params.id).exec();
  //Send the user back to the heroes page
  res.redirect("/heroes/");
};

export { heroList, heroListByName, heroById, createHero, update_get, update_post, deleteHero };