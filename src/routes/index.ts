import { Router } from "express";
import { userRouter } from "./users.route";
import { airlineRouter } from "./airlines.route";
import { airlineClubRouter } from "./airline_clubs.route";
import { bankClubRouter } from "./bank_clubs.route";
import { accountRouter } from "./accounts.route";
import { walletsRouter } from "./wallets.route";
import { walletTypeRouter } from "./wallet_types.route";
import { transactionRouter } from "./transactions.route";

const router = Router();

router.use("/users", userRouter);
router.use("/airlines", airlineRouter);
router.use("/airline_clubs", airlineClubRouter);
router.use("/bank_clubs", bankClubRouter);
router.use("/accounts", accountRouter);
router.use("/wallet_types", walletTypeRouter);
router.use("/wallets", walletsRouter);
router.use("/transactions", transactionRouter);

export { router };