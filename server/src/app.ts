import fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = fastify({
    logger: true,
});

export default app;
