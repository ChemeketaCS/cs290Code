var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`This is the users page.<br>
  Try <a href="ascholer">ascholer/</a>
  `
  );
});

//This will handle /user/XX
router.get("/:name", (req, res) => {
  let userName = req.params.name; //:name automatically becomes this
  res.send(`You asked ${userName}'s directory.`);
});

module.exports = router;
