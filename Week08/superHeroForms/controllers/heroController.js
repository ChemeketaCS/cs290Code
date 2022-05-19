// Functions to generate pages for hero routes
const routeHelper = require("../routes/routeHelpers.js");

const Hero = require("../models/hero.js");
const Team = require("../models/team.js");

//All heroes
exports.heroList = async function (req, res, next) {
  try {
    let heroList = await Hero.find().sort("name").exec();
    res.render("superheroList.ejs", { heroList });
  } catch (err) {
    next(err);
  }
};

//Get list by partial name match
exports.heroListByName = async function (req, res, next) {
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
exports.heroById = async function (req, res, next) {
  try {
    let hero = await Hero.findById(req.params.id)
      .populate("team") //get data of team as well
      .exec();
    //pass the hero itself to the view
    res.render("superheroSingle.ejs", hero);
  } catch (err) {
    next(err);
  }
};

//Add a new hero
exports.create = async function (req, res, next) {
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
exports.update_get = async function (req, res, next) {
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

// //Use express-validator to remove harmful content
// const { body } = require("express-validator");

//Handles submission of the form - it has a list of functions that will be run
exports.update_post = [
  // //First HTML escape all the text inputs
  // body("name").escape(),                  //function call to sanitize the name input
  // body("secretIdentity").escape(),        //sanitize secret identity
  // body("powers").escape(),                //sanitize powers
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

      console.log(req.body);

      //Process Powers Input - split string into an array
      let powersList = req.body.powers.split("\n");
      for (let i = 0; i < powersList.length; i++) {
        powersList[i] = powersList[i].trim(); //get rid of extra whitespace at begin/end of each
        if (powersList[i] === "") {
          //Item is empty, so delete it
          powersList.splice(i, 1);
          i--;
        }
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
