import { FastifyInstance } from "fastify";

export default async function routes(fastify: FastifyInstance) {
    fastify.get("/test", async (_request, reply) => {
        reply.send({ message: "API funcionando!" });
    });
}