//Make use of bcrypt for encrypting user passwords
import { default as bcrypt } from 'bcrypt';

//Connect to DB with Mongoose
import { default as credentials } from './dbCredentials.mjs';
import { default as mongoose } from 'mongoose';
mongoose.connect(credentials.connection_string);

//Load our models
import { default as User } from './models/user.mjs';

async function makeUsers() {
  //Get rid of existing users
  await User.deleteMany();
  console.log("Old users deleted");


  const user1 = new User({
    name: "Sue",
    password: "pass123",
  });

  const user2 = new User({
    name: "Joe",
    password: "pass123",
  });

  //Use bcrypt to generate passwords for users using 10 rounds to generate
  user1.password = bcrypt.hashSync(user1.password, 10);
  user2.password = bcrypt.hashSync(user2.password, 10);

  //Save to DB
  await user1.save();
  await user2.save();
  console.log("Users created");
  mongoose.connection.close();
}

//Make it happen
makeUsers();
