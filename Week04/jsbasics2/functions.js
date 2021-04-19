console.log(foo(10));

function foo(a) {
  return a * 2;
}

//Anonymous function called with 30
(function (x) {
  console.log("You called me with " + x);
})(30);

//Bind myfun to the function
const myfun = function (x) {
  console.log("You called this with " + x);
};
myfun(50); //now call with 50

const times = (x, y) => {
  let z = x * y;
  return z;
};

const square = (x) => x * x;

console.log(times(5, 6));
console.log(square(3));

//Make a random number between min and max inclusive
function random(min, max) {
  return Math.floor(Math.random() * (max + 1) + min);
}

const btn = document.querySelector("#pressme");
btn.onclick = function () {
  const rndColString =
    "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
  document.body.style.backgroundColor = rndColString;
};

function makeRandColor() {
  const rndColString =
    "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
  document.body.style.backgroundColor = rndColString;
}
btn.onclick = makeRandColor;
