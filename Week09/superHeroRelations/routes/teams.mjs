import { default as express } from "express";
const router = express.Router();
export default router;

import { default as routeHelper } from "./routeHelpers.mjs";

import { default as Team } from "../models/team.mjs";
import { default as Hero } from "../models/hero.mjs";

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

router.get("/delete/:id", async function (req, res) {
  //Before we delete the team, we need to find any hero's that are on this team
  // and unset their Team
  let teamHeroes = await Hero.find().where("team").eq(req.params.id).exec();
  for (let h of teamHeroes) {
    h.team = undefined; //tell mongoose to remove team field
    h.save(); //no need to wait for result, just do it
  }

  //Now delete the team
  let team = await Team.findByIdAndRemove(req.params.id).exec();

  //Send the user back to the teams page
  res.redirect("/teams/");
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

    let allHeroes = await Hero.find().select("name team").exec(); //get name/team/id of all heroes

    //Mark all heroes that are on this team by setting an on_team property before handing to view
    allHeroes.forEach((hero, index, arr) => {
      if (hero.team && hero.team._id.equals(team._id))
        arr[index].on_team = true;
    });

    res.render("teamForm.ejs", {
      title: "Update Team",
      team: team,
      allHeroes: allHeroes,
    });
  } catch (err) {
    console.log(err);
    var err = new Error("Error rendering team");
    err.status = 404;
    return next(err);
  }
});

//Handles the actual submission (post) of the update
router.post("/update/:id", async function (req, res, next) {
  //If team exists in DB, fetch it
  let team = await Team.findById(req.params.id).exec();
  //If not, make one
  if (team === null)
    team = new Team({
      _id: req.body.id,
    });

  console.log("request body:", req.body);

  //Replace existing data
  team.squadName = req.body.squadName;
  team.homeTown = req.body.homeTown;
  team.formed = req.body.formed;
  //Need to turn "true"/undefined value into true/false
  team.active = req.body.active === "true" ? true : false;

  //Heroes are not stored in the team, need to go update all heroes
  //to remove ones no longer on team and add new ones
  let oldheroes = await team.members;
  let newheroIds = req.body.members;

  let removed = await Hero.find()
    .where("_id")
    .in(oldheroes) //id is in the existing members
    .where("_id")
    .nin(newheroIds) //id is not in the newly selected members
    .exec();

  removed.forEach(async (hero) => {
    console.log("Removing ", hero, " from team");
    hero.team = undefined; //tell mongoose to remove team field
    await hero.save();
  });

  let added = await Hero.find()
    .where("_id")
    .nin(oldheroes) //id is not in the existing members
    .where("_id")
    .in(newheroIds) //id is in the newly selected members
    .exec();

  added.forEach(async (hero) => {
    console.log("Adding ", hero, " to team");
    hero.team = team;
    await hero.save();
  });

  console.log("Saving ", team);

  //Try to save it
  team
    .save()
    .then((team) => {
      //Success, redirect to details view of team
      res.redirect(team.url);
    })
    .catch((err) => {
      //Problem, show the form with error messages
      res.render("teamForm.ejs", {
        title: "Update Team",
        team: team,
        errors: routeHelper.errorParser(err.message),
      });
    });
});
