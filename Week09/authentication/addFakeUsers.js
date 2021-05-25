//Make use of bcrypt for encrypting user passwords
const bcrypt = require("bcrypt");

//Connect to DB with Mongoose
const credentials = require("./dbCredentials.js");
const mongoose = require("mongoose");
mongoose.connect(credentials.connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Load our models
const User = require("./models/user.js");

async function makeUsers() {
  //Get rid of existing teams
  await User.deleteMany();

  const user1 = new User({
    name: "Sue",
    password: "pass123",
  });

  const user2 = new User({
    name: "Joe",
    password: "pass123",
  });

  //Use bcrypt to generate passwords for users using 10 rounds to generate salt
  user1.password = bcrypt.hashSync(user1.password, 10);
  user2.password = bcrypt.hashSync(user2.password, 10);

  //Save to DB
  await user1.save();
  await user2.save();
  mongoose.connection.close();
}

//Make it happen
makeUsers();
