import { FastifyInstance } from "fastify";
import weatherRoutes from "./weather/routes";

export default async function router(fastify: FastifyInstance) {
  fastify.register(weatherRoutes, { prefix: "/api/v1/weather" });
}
