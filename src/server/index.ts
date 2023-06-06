import express from "express";
import { router } from "../routes";
import cors from "cors";


const app = express();
const routePrefix = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(`${routePrefix}`, router);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));