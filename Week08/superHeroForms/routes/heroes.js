import {default as express} from 'express';
var router = express.Router();

// Controller has the functions that are used by this route
import {default as heroController} from '../controllers/heroController.js';

router.get("/", heroController.heroList);

router.get("/byname/:name", heroController.heroListByName);

router.get("/id/:id", heroController.heroById);

router.get("/create", heroController.create);

router.get("/update/:id", heroController.update_get);

router.post("/update/:id", heroController.update_post);

router.get("/delete/:id", heroController.delete);

module.exports = router;
