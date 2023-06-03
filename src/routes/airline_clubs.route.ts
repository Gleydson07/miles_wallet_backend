import { Router } from "express";
import { CreateAirlineClubController } from "../controllers/airline_clubs/CreateAirlineClubController";
import { EnableAirlineClubController } from "../controllers/airline_clubs/EnableAirlineClubController";
import { DisableAirlineClubController } from "../controllers/airline_clubs/DisableAirlineClubController";
import { FindByIdAirlineClubController } from "../controllers/airline_clubs/FindByIdAirlineClubController";
import { FindAllAirlineClubController } from "../controllers/airline_clubs/FindAllAirlineClubController";

const airlineClubRouter = Router();

const createAirlineClubController = new CreateAirlineClubController();
const enableAirlineClubController = new EnableAirlineClubController();
const disableAirlineClubController = new DisableAirlineClubController();
const findByIdAirlineClubController = new FindByIdAirlineClubController();
const findAllAirlineClubController = new FindAllAirlineClubController();

airlineClubRouter.post("/", createAirlineClubController.handle);
airlineClubRouter.patch("/:id/enable", enableAirlineClubController.handle);
airlineClubRouter.patch("/:id/disable", disableAirlineClubController.handle);
airlineClubRouter.get("/:id", findByIdAirlineClubController.handle);
airlineClubRouter.get("/", findAllAirlineClubController.handle);

export { airlineClubRouter };