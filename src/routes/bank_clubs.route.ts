import { Router } from "express";
import { CreateBankClubController } from "../controllers/bank_clubs/CreateBankClubController";
import { EnableBankClubController } from "../controllers/bank_clubs/EnableBankClubController";
import { DisableBankClubController } from "../controllers/bank_clubs/DisableBankClubController";
import { FindByIdBankClubController } from "../controllers/bank_clubs/FindByIdBankClubController";
import { FindAllBankClubController } from "../controllers/bank_clubs/FindAllBankClubController";

const bankClubRouter = Router();

const createBankClubController = new CreateBankClubController();
const enableBankClubController = new EnableBankClubController();
const disableBankClubController = new DisableBankClubController();
const findByIdBankClubController = new FindByIdBankClubController();
const findAllBankClubController = new FindAllBankClubController();

bankClubRouter.post("/", createBankClubController.handle);
bankClubRouter.patch("/:id/enable", enableBankClubController.handle);
bankClubRouter.patch("/:id/disable", disableBankClubController.handle);
bankClubRouter.get("/:id", findByIdBankClubController.handle);
bankClubRouter.get("/", findAllBankClubController.handle);

export { bankClubRouter };