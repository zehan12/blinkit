import { FastifyListenOptions } from "fastify";
import app from "./app";
import { config } from "./config";
import { connectDB } from "./config/db";

const { port, db } = config;

const PORT: FastifyListenOptions["port"] = port ? Number(port) : undefined;

export const startServer = async () => {
    await connectDB(db.uri);
    app.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
        if (err) {
            console.log(err);
            process.exit(1);
        } else {
            console.log(`Blinkit Server Started on http://localhot:${PORT}`);
        }
    });
};

startServer();
