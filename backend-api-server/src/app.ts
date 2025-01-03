import express, { Application, Request, Response } from "express";
import cors from "cors";
import { sessionMiddleware } from "./middlewares";
import { ENDPOINT_V1_PREFIX } from "./constants";
import {
    adminRoutesV1,
    authRoutesV1,
    profileRoutesV1,
    tokenRouesV1,
} from "./routes";
import { corsOptions } from "./configs";
import { productRoutesV1 } from "./routes/product.route";

const app: Application = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "api is working." });
});

app.get(ENDPOINT_V1_PREFIX, (req, res) => {});

app.use(ENDPOINT_V1_PREFIX + "/admin", adminRoutesV1);
app.use(ENDPOINT_V1_PREFIX + "/auth", authRoutesV1);
app.use(ENDPOINT_V1_PREFIX + "/token", tokenRouesV1);
app.use(ENDPOINT_V1_PREFIX + "/profile", profileRoutesV1);
app.use(ENDPOINT_V1_PREFIX + "/product", productRoutesV1);

export default app;
