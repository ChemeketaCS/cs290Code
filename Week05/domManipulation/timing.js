//run as soon as file processed
const dino = document.querySelector("img");
dino.addEventListener("click", function () {
  this.style.border = "5px solid blue";
});

//wait to run until window is loaded
window.addEventListener("load", function () {
  const dino2 = document.querySelector("img");
  dino2.addEventListener("click", function () {
    this.style.boxShadow = "black 10px 10px 5px";
  });
});
