var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("You asked for /products/");
});

router.get("/foo", function (req, res, next) {
  res.send("You asked for /products/foo");
});

router.get("/bar", function (req, res, next) {
  res.send("You asked for /products/bar");
});

module.exports = router;
