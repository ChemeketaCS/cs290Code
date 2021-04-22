console.log("---------------------------");
console.log("modern classes");
console.log("---------------------------");

class Hero {
  constructor(first, last, age, gender = "female", interests = []) {
    this.name = {
      first,
      last,
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }

  greeting() {
    console.log(`Hi! I'm ${this.name.first}`);
  }

  farewell() {
    console.log(`${this.name.first} has left the building. Bye for now!`);
  }
}

let han = new Hero("Han", "Solo", 25, "male", ["Smuggling"]);
let leia = new Hero("Leia", "Organa", 19); //don't have to bother with all params!
han.greeting();
leia.greeting();

Hero.prototype.getOlder = function () {
  this.age++;
};
console.log(han.age);
han.getOlder();
console.log(han.age);

class SuperHero extends Hero {
  constructor(
    first,
    last,
    age,
    gender = "female",
    interests = [],
    heroName,
    powers
  ) {
    super(first, last, age, gender, interests);
    this.heroName = heroName;
    this.powers = powers;
  }
  brag() {
    console.log(`${this.heroName} has ${this.powers.join(", ")}`);
  }
}

let hulk = new SuperHero(
  "Bruce",
  "Banner",
  28,
  "male",
  ["smashing"],
  "Incredible Hulk",
  ["super strength", "mega-jumping"]
);

hulk.greeting();
hulk.brag();

//-------------------------------------

class Instructor {
  constructor(subject, college) {
    // subject and grade are specific to Teacher
    this._subject = subject;
    this.college = college;
  }

  get subject() {
    return this._subject;
  }

  set subject(newSubject) {
    if (String(newSubject).trim() !== "") this._subject = newSubject;
  }
}

let scholer = new Instructor("CS", "Chemeketa");
scholer.subject = "Computer Science";
console.log(scholer.subject);
console.log(scholer);
