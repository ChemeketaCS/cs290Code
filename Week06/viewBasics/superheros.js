let superSquad = {
  squadName: "Super hero squad",
  homeTown: "Metro City",
  formed: 2016,
  secretBase: "Super tower",
  active: true,
  activateTeam: function () {
    for (let m of this.members) {
      console.log("Activating " + m.name);
    }
  },
  members: [
    {
      name: "Molecule Man",
      age: 29,
      secretIdentity: "Dan Jukes",
      powers: ["Radiation resistance", "Turning tiny", "Radiation blast"],
    },
    {
      name: "Madame Uppercut",
      age: 39,
      secretIdentity: "Jane Wilson",
      powers: [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes",
      ],
    },
    {
      name: "Eternal Flame",
      age: 1000000,
      secretIdentity: "Unknown",
      powers: [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel",
      ],
    },
  ],
};

const ejs = require("ejs");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
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

  res.render("superheros.ejs", superSquad);
});

app.get("/hero/:name", async (req, res, next) => {
  const heroName = req.params.name;
  console.log(heroName);
  let index = -1;
  superSquad.members.forEach((value, i) => {
    if (value.name === heroName) {
      index = i;
    }
  });

  let hero = superSquad.members[index];
  console.log(hero);

  if (index != -1) res.render("superheroSingle.ejs", hero);
  else next();
});

app.get("*", async (req, res) => {
  res.status = 404;
  res.send("No such file");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
