console.log(foo(10));

function foo(a) {
  return a * 2;
}

//Anonymous function called with 30
(function (x) {
  console.log('You called me with ' + x);
})(30);

//Bind myfun to the function
const myfun = function (x) {
  console.log('You called this with ' + x);
};
myfun(50); //now call with 50

const times = (x, y) => {
  let z = x * y;
  return z;
};

const square = x => x * x;

console.log(times(5, 6));
console.log(square(3));

function makeMultiplierFunction(multValue) {
  return (n) => multValue * n;
}

const double = makeMultiplierFunction(2);
const triple = makeMultiplierFunction(3);
console.log( double(4) );
console.log( triple(4) );


//Make a random number between min and max inclusive
function random(min, max) {
  return Math.floor(Math.random() * (max + 1) + min);
}

const btn = document.querySelector('#pressme');
btn.addEventListener('click', () => {
  const rndColString =
    `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
  document.body.style.backgroundColor = rndColString;
});

// function makeRandColor() {
//   const rndColString =
//     'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
//   document.body.style.backgroundColor = rndColString;
// }

// const btn = document.querySelector('#pressme');
// btn.addEventListener, makeRandColor);
