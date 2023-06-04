import { Router } from "express";
import { CreateWalletController } from "../controllers/wallets/CreateWalletController";
import { DeleteWalletController } from "../controllers/wallets/DeleteWalletController";
import { FindByIdWalletController } from "../controllers/wallets/FindByIdWalletController";
import { FindManyByAccountIdWalletController } from "../controllers/wallets/FindManyByAccountIdWalletController";
import { UpdateWalletController } from "../controllers/wallets/UpdateWalletController";
import { UpdateBalanceWalletController } from "../controllers/wallets/UpdateBalanceWalletController";

const walletsRouter = Router();

const createWalletController = new CreateWalletController();
const deleteWalletController = new DeleteWalletController();
const findByIdWalletController = new FindByIdWalletController();
const findManyByAccountIdWalletController = new FindManyByAccountIdWalletController();
const updateWalletController = new UpdateWalletController();
const updateBalanceWalletController = new UpdateBalanceWalletController();

walletsRouter.post("/", createWalletController.handle);
walletsRouter.delete("/:id", deleteWalletController.handle);
walletsRouter.get("/:id", findByIdWalletController.handle);
walletsRouter.get("/:accountId/account", findManyByAccountIdWalletController.handle);
walletsRouter.put("/:id", updateWalletController.handle);
walletsRouter.patch("/:id/balance", updateBalanceWalletController.handle);

export { walletsRouter };