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

//call a function
superSquad.activateTeam();

//This would be a circular reference
//superSquad.members[0].team = superSquadID;

//Turn superSquad into a string with 2 spaces as indent
let squadString = JSON.stringify(superSquad, " ", 2);

console.log(squadString);
//console.log(squadString.squadName); //This no longer makes sense - it is just a string

//Turn the string back into an object
let parsedSquad = JSON.parse(squadString);
console.log(parsedSquad);
console.log(parsedSquad.squadName);

//------------------------------------------------------

let jsonArray = `[
  {
    "name": "Molecule Man",
    "age": 29,
    "secretIdentity": "Dan Jukes",
    "powers": [
      "Radiation resistance",
      "Turning tiny",
      "Radiation blast"
    ]
  },
  {
    "name": "Madame Uppercut",
    "age": 39,
    "secretIdentity": "Jane Wilson",
    "powers": [
      "Million tonne punch",
      "Damage resistance",
      "Superhuman reflexes"
    ]
  }
]`;

let parsedArray = JSON.parse(jsonArray);
console.log(parsedArray);
console.log(parsedArray[0]);

let foo = {
  a: 1,
  b: (x) => 2 * x,
  c: new Date(),
};

let parsedArray2 = JSON.stringify(foo);
console.log(parsedArray2);
