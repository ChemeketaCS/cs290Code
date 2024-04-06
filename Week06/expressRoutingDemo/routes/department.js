import {default as express} from 'express';
var router = express.Router();

//This will handle /department/
router.get('/', function(req, res, next) {
  res.send(`This is the departments page.<br>
  Try <a href="/department/cs">/department/cs/</a>
  `
  );
});

//This will handle /department/XX
router.get("/:name", (req, res) => {
  let deptName = req.params.name; //:name automatically becomes this
  res.send(`You asked for the ${deptName} department.<br>
  Try <a href="/department/cs/course/160">/department/cs/course/160</a>
  `);
});

//This will handle /department/XX/course/XX
router.get("/:name/course/:id", (req, res) => {
  let deptName = req.params.name; //:name automatically becomes this
  let courseID = req.params.id; //:id automatically becomes this
  res.send(`You asked for ${deptName}${courseID}`);
});

module.exports = router;
