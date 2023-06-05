import { Router } from "express";
import { CreateTransactionController } from "../controllers/transactions/CreateTransactionController";
import { CreateDepositCashTransactionController } from "../controllers/transactions/CreateDepositCashTransactionController";
import { DeleteTransactionController } from "../controllers/transactions/DeleteTransactionController";
import { FindByIdTransactionController } from "../controllers/transactions/FindByIdTransactionController";
import { FindManyByKeysTransactionController } from "../controllers/transactions/FindManyByKeysTransactionController";

const transactionRouter = Router();

const createTransactionController = new CreateTransactionController();
const createDepositCashTransactionController = new CreateDepositCashTransactionController();
const deleteTransactionController = new DeleteTransactionController();
const findByIdTransactionController = new FindByIdTransactionController();
const findManyByKeysTransactionController = new FindManyByKeysTransactionController();

transactionRouter.post("/", createTransactionController.handle);
transactionRouter.post("/deposit", createDepositCashTransactionController.handle);
transactionRouter.delete("/:id", deleteTransactionController.handle);
transactionRouter.get("/:id", findByIdTransactionController.handle);
transactionRouter.get("/", findManyByKeysTransactionController.handle);

export { transactionRouter };