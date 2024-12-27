import express, { Application, Request, Response } from "express";
import { sessionMiddleware } from "./middleware";

const app: Application = express();

app.use(sessionMiddleware);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "api is working." });
});

export default app;
