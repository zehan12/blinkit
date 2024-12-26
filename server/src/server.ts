import { FastifyListenOptions } from "fastify";
import app from "./app";
import { config } from "./config";

const PORT: FastifyListenOptions["port"] = config.port
    ? Number(config.port)
    : undefined;

export const startServer = async () => {
    app.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Blinkit Server Started on http://localhot:${PORT}`);
        }
    });
};

startServer();
