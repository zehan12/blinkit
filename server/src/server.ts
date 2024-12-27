import app from "./app";
import { config } from "./config";
import { connectDB } from "./config/db";

const { port, db } = config;

const PORT = port ? Number(port) : undefined;

export const startServer = async () => {
    await connectDB(db.uri);
    const server = app.listen(PORT, () => {
        console.log(`
################################################
    🚀 Server listening on port: ${PORT} 🚀
################################################
        `);
    });

    const [major, minor] = process.versions.node.split(".").map(parseFloat);
    if (major < 16 || (major === 16 && minor <= 0)) {
        console.log(
            "Please go to nodejs.org and download version 18 or greater. 👌\n "
        );
        process.exit();
    }

    const exitHandler = () => {
        if (server) {
            server.close(() => {
                console.log("Server closed");
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    };

    const unexpectedErrorHandler = (error: unknown) => {
        console.log(error);
        exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);

    process.on("SIGTERM", () => {
        console.log("SIGTERM received");
        if (server) {
            server.close();
        }
    });
};

startServer();
