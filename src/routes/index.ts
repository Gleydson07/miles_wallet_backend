import { Router } from "express";
import { userRouter } from "./users.route";
import { airlineRouter } from "./airlines.route";
import { airlineClubRouter } from "./airline_clubs.route";
import { bankClubRouter } from "./bank_clubs.route";

const router = Router();

router.use("/users", userRouter);
router.use("/airlines", airlineRouter);
router.use("/airline_clubs", airlineClubRouter);
router.use("/bank_clubs", bankClubRouter);

export { router };