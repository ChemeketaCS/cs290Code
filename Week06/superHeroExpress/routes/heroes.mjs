import { default as express } from "express";
const router = express.Router();
export default router;

//Listing for all heroes
router.get("/", async (req, res) => {
  const superSquad = await getSquad();
  console.log(superSquad);

  //Sort the members of superQuad
  superSquad.members.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  //Manually render the view and send it
  //let page = await ejs.render("views/superheros.ejs", superSquad);
  //res.send(page);

  //Automatically render and send the view
  //Assumed view is in views/ folder

  res.render("superheroes.ejs", superSquad);
});

//Listing for a hero by name
router.get("/:name", async (req, res, next) => {
  const superSquad = await getSquad();
  console.log(superSquad);

  const heroName = req.params.name;

  console.log("--------------------");
  console.log(heroName);
  console.log("--------------------");
  let index = -1;

  superSquad.members.forEach((value, i) => {
    if (value.name === heroName) {
      index = i;
    }
  });

  let hero = superSquad.members[index];
  console.log(hero);

  if (index !== -1) res.render("superheroSingle.ejs", hero);
  else next();
});

//--------------------------------------------------------
//My data source - gets the super hero data

//Need to have node-fetch installed!
import { default as fetch } from "node-fetch";

async function getSquad() {
  let responsePromise = await fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json"
  );
  let json = await responsePromise.json();
  return json;
}
