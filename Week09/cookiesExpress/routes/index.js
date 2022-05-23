var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  //Print out the cookies attached to the request
  console.log("Cookies: ", req.cookies);

  //If no cookies, or no theme cookie, set theme=light
  if (!req.cookies || !req.cookies["theme"]) res.cookie("theme", "light");

  //Always send a cookie with a userID=3821738237482
  //But have it last a max of 60 seconds and
  // be httpOnly - not be available via js
  res.cookie("userID", "3821738237482", { maxAge: 60000, httpOnly: true });

  res.render("index.ejs", {
    theme: req.cookies["theme"] ? req.cookies["theme"] : "light",
  });
});

module.exports = router;
