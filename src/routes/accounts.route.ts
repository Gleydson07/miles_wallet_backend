import { Router } from "express";
import { CreateAccountController } from "../controllers/accounts/CreateAccountController";
import { DeleteAccountController } from "../controllers/accounts/DeleteAccountController";
import { FindByIdAccountController } from "../controllers/accounts/FindByIdAccountController";
import { FindManyByUserIdAccountController } from "../controllers/accounts/FindManyByUserIdAccountController";
import { UpdateAccountController } from "../controllers/accounts/UpdateAccountController";

const accountRouter = Router();

const createAccountController = new CreateAccountController();
const deleteAccountController = new DeleteAccountController();
const findByIdAccountController = new FindByIdAccountController();
const findManyByUserIdAccountController = new FindManyByUserIdAccountController();
const updateAccountController = new UpdateAccountController();

accountRouter.post("/", createAccountController.handle);
accountRouter.delete("/:id", deleteAccountController.handle);
accountRouter.get("/:id", findByIdAccountController.handle);
accountRouter.get("/user/:userId", findManyByUserIdAccountController.handle);
accountRouter.put("/:id", updateAccountController.handle);

export { accountRouter };