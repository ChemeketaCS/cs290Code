var express = require("express");
var router = express.Router();

const Team = require("../models/team");

router.get("/", async function (req, res) {
  let teamList = await Team.find().sort("name").exec();
  //pass an object with one property
  res.render("teamList.ejs", { teamList: teamList });
});

router.get("/id/:id", async function (req, res, next) {
  let team = await Team.findById(req.params.id)
    .exec() //do query
    .catch(
      //if there is a problem...
      (except) => {
        console.log("Error in hero router", except);
        next(); //pass this on to next handler (404)
      }
    );
    
  //Team doesn't know about heroes that are members
  //but provides a property to find them
  let members = await team.members;

  //pass the team and members list to the view
  res.render("teamSingle.ejs", { team: team, members: members });
});

router.get("/delete/:id", async function (req, res) {
  //Before we delete the team, we need to find any hero's that are on this team
  // and unset their Team
  const Hero = require("../models/hero");
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

module.exports = router;
