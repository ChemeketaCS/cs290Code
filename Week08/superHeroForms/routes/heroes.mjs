import { default as express } from "express";
const router = express.Router();
export default router;

// Controller has the functions that are used by this route
// Import all of them under the alias heroController
import * as heroController from "../controllers/heroController.mjs";

router.get("/", heroController.heroList);

router.get("/byname/:name", heroController.heroListByName);

router.get("/id/:id", heroController.heroById);

router.get("/create", heroController.createHero);

router.get("/update/:id", heroController.update_get);

router.post("/update/:id", heroController.update_post);

router.get("/delete/:id", heroController.deleteHero);
