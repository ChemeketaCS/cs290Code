import {default as express} from 'express';
var router = express.Router();

import {default as heroController} from '../controllers/heroController.js';

router.get("/", heroController.heroList);

router.get("/byname/:name", heroController.heroListByName);

router.get("/id/:id", heroController.heroById);

router.get("/delete/:id", heroController.delete);

router.get("/create", heroController.create);

router.get("/update/:id", heroController.update_get);

router.post("/update/:id", heroController.update_post);

module.exports = router;
