
import { env } from "./env";
import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error', issues: error.issues })
  }
})

app.listen({ port: env.PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address} 🚀`);
});