import { default as express } from "express";
const router = express.Router();
export default router;

import { default as Hero } from "../models/hero.mjs";
import { default as Team } from "../models/team.mjs";

router.get("/", async function (req, res, next) {
  try {
    console.log("/ requested");

    let heroList = await Hero.find()
      .sort("name")
      .exec();

    res.set("Content-Type", "application/json");
    console.log(heroList);
    res.json(heroList);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/byname/:name", async function (req, res, next) {
  try {
    let namePatternToMatch = new RegExp(req.params.name, "i");
    let heroList = await Hero.find()
      .where("name")
      .regex(namePatternToMatch)
      .sort("name")
      .populate("team squadName")
      .exec();

    res.set("Content-Type", "application/json");
    res.json(heroList);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/id/:id", async function (req, res, next) {
  try {
    let hero = await Hero.findById(req.params.id)
      .populate("team squadName")
      .exec();

    if (hero === null) res.sendStatus(404);
    else {
      res.set("Content-Type", "application/json");
      res.json(hero);
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/delete/:id", async function (req, res, next) {
  try {
    let result = await Hero.findByIdAndDelete(req.params.id).exec();
    console.log(result);

    if (result === null) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/update/", async function (req, res, next) {
  try {
    let hero = await Hero.findById(req.body._id).exec();
    //If not, make one
    if (hero === null)
      hero = new Hero({
        _id: req.body.id,
      });

    //Replace existing data
    hero.name = req.body.name;
    hero.secretIdentity = req.body.secretIdentity;
    hero.age = req.body.age;
    //If team is not empty, use that value, otherwise clear it out
    hero.team = req.body.team !== "" ? req.body.team : undefined;
    hero.powers = req.body.powers;

    //Try to save it
    hero
      .save()
      .then((hero) => {
        //Success, send the object back
        res.set("Content-Type", "application/json");
        res.json(hero);
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          let errors = {};

          Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
          });

          return res.status(400).send(errors);
        }
        res.sendStatus(500);
      });
  } catch (err) {
    res.sendStatus(500);
  }
});
