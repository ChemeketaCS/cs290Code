import { default as express } from "express";
const router = express.Router();
export default router;

import * as routeHelper from '../routes/routeHelpers.mjs';

import { default as Team } from "../models/team.mjs";

router.get("/", async function (req, res) {
  let teamList = await Team.find().sort("name").exec();
  //pass an object with one property
  res.render("teamList.ejs", { teamList: teamList });
});

router.get("/id/:id", async function (req, res) {
  let team = await Team.findById(req.params.id).exec();
  //Team doesn't know about heroes that are members
  //but provides a property to find them
  let members = await team.members;

  //pass the team and members list to the view
  res.render("teamSingle.ejs", { team: team, members: members });
});

router.get("/create", function (req, res) {
  //Make a new Team object just to get any default values
  // and to have the right properties for the form
  let team = new Team({});
  res.render("teamForm.ejs", { title: "Create Team", team: team });
});

//Handles the initial request (get) to load an update page
router.get("/update/:id", async function (req, res, next) {
  try {
    let team = await Team.findById(req.params.id).exec();
    console.log(team);
    res.render("teamForm.ejs", { title: "Update Team", team: team });
  } catch (err) {
    next();
  }
});

//Handles the actual submission (post) of the update
router.post("/update/:id", async function (req, res, next) {

  //If team exists in DB, fetch it
  let team = await Team.findById(req.params.id).exec();
  //If not, make one
  if (team === null)
    team = new Team({
      _id: req.params.id,
    });

  console.log("Request body: ", req.body);

  //Replace existing data
  team.squadName = req.body.squadName;
  team.homeTown = req.body.homeTown;
  team.formed = req.body.formed;
  //team.active is boolean, req.body.active is string
  //Need to turn "true"/undefined value into true/false
  team.active = req.body.active === "true" ? true : false;

  console.log(team);

  //Try to save it
  team
    .save()
    .then((team) => {
      //Success, redirect to details view of team
      res.redirect(team.url);
    })
    .catch((err) => {
      console.log(err.message);
      //Problem, show the form with error messages
      res.render("teamForm.ejs", {
        title: "Update Team",
        team: team,
        errors: routeHelper.errorParser(err.message),
      });
    });
});

import { default as Hero } from "../models/hero.mjs";
router.get("/delete/:id", async function (req, res) {
  //Before we delete the team, we need to find any hero's that are on this team
  // and unset their Team
  let teamHeroes = await Hero.find().where("team").eq(req.params.id).exec();
  for (let h of teamHeroes) {
    h.team = undefined; //tell mongoose to remove team field
    h.save(); //no need to wait for result, just do it
  }

  //Now delete the team
  let team = await Team.findByIdAndDelete(req.params.id).exec();

  //Send the user back to the teams page
  res.redirect("/teams/");
});
