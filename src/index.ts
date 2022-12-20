import fastify from "fastify";
import router from "./router";

const server = fastify();

server.register(import("@fastify/rate-limit"), {
  max: 5,
  timeWindow: "1 minute",
});

router(server);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
