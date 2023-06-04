import { Router } from "express";
import { CreateWalletTypeController } from "../controllers/wallet_types/CreateWalletTypeController";
import { DeleteWalletTypeController } from "../controllers/wallet_types/DeleteWalletTypeController";
import { FindByIdWalletTypeController } from "../controllers/wallet_types/FindByIdWalletTypeController";
import { FindAllWalletTypeController } from "../controllers/wallet_types/FindAllWalletTypeController";
import { UpdateWalletTypeController } from "../controllers/wallet_types/UpdateWalletTypeController";

const walletTypeRouter = Router();

const createWalletTypeController = new CreateWalletTypeController();
const deleteWalletTypeController = new DeleteWalletTypeController();
const findByIdWalletTypeController = new FindByIdWalletTypeController();
const findAllWalletTypeController = new FindAllWalletTypeController();
const updateWalletTypeController = new UpdateWalletTypeController();

walletTypeRouter.post("/", createWalletTypeController.handle);
walletTypeRouter.delete("/:id", deleteWalletTypeController.handle);
walletTypeRouter.get("/:id", findByIdWalletTypeController.handle);
walletTypeRouter.get("/", findAllWalletTypeController.handle);
walletTypeRouter.put("/:id", updateWalletTypeController.handle);

export { walletTypeRouter };