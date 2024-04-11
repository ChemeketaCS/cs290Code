import { default as Text } from "./textSchema.mjs";
import { default as ColorEnum } from "./colorEnum.mjs";

let t1 = new Text({ contents: "Hello there", color: ColorEnum.RED });

console.log(t1);
