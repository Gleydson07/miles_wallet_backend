import { Router } from "express";
import { CreateAirlineController } from "../controllers/airlines/CreateAirlineController";
import { EnableAirlineController } from "../controllers/airlines/EnableAirlineController";
import { DisableAirlineController } from "../controllers/airlines/DisableAirlineController";
import { FindByIdAirlineController } from "../controllers/airlines/FindByIdAirlineController";
import { FindAllAirlineController } from "../controllers/airlines/FindAllAirlineController";

const airlineRouter = Router();

const createAirlineController = new CreateAirlineController();
const enableAirlineController = new EnableAirlineController();
const disableAirlineController = new DisableAirlineController();
const findByIdAirlineController = new FindByIdAirlineController();
const findAllAirlineController = new FindAllAirlineController();

airlineRouter.post("/", createAirlineController.handle);
airlineRouter.patch("/:id/enable", enableAirlineController.handle);
airlineRouter.patch("/:id/disable", disableAirlineController.handle);
airlineRouter.get("/:id", findByIdAirlineController.handle);
airlineRouter.get("/", findAllAirlineController.handle);

export { airlineRouter };