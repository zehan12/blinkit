import Fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = Fastify({
    logger: true,
});

app.get("/", (req, res) => {
    res.status(200).send({ message: "api is working." });
});

export default app;
