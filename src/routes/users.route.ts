import { Router } from "express";
import { CreateUserController } from "../controllers/users/CreateUserController";
import { EnableUserController } from "../controllers/users/EnableUserController";
import { DisableUserController } from "../controllers/users/DisableUserController";
import { FindByEmailUserController } from "../controllers/users/FindByEmailUserController";
import { UpdatePasswordUserController } from "../controllers/users/UpdatePasswordUserController";
import { LoginUserController } from "../controllers/users/LoginUserController";

const userRouter = Router();

const loginUserController = new LoginUserController();
const createUserController = new CreateUserController();
const enableUserController = new EnableUserController();
const disableUserController = new DisableUserController();
const findByEmailUserController = new FindByEmailUserController();
const updatePasswordUserController = new UpdatePasswordUserController();

userRouter.post("/login", loginUserController.handle);
userRouter.post("/", createUserController.handle);
userRouter.patch("/:id/enable", enableUserController.handle);
userRouter.patch("/:id/disable", disableUserController.handle);
userRouter.patch("/:email", updatePasswordUserController.handle);
userRouter.get("/:email", findByEmailUserController.handle);

export { userRouter };