const Text = require("./textSchema.js");
const ColorEnum = require("./colorEnum.js");

let t1 = new Text({ contents: "Hello there", color: ColorEnum.RED });

console.log(t1);
