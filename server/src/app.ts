import express, { Application, Request, Response } from "express";
import { sessionMiddleware } from "./middleware";
import { endpointV1 } from "./constant";
import { adminRoutesV1 } from "./routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "api is working." });
});

app.use(endpointV1 + "/admin", adminRoutesV1);

export default app;
