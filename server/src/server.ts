import app from "./app";

const PORT = 3000;

export const startServer = async () => {
    app.listen({ port: PORT, host: "0.0.0.0" }, (err, add) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Blinkit Server Started on http://localhot:${PORT}`);
        }
    });
};

startServer();
