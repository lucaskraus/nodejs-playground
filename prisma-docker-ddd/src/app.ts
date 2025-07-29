
import { env } from "./env";
import fastify from "fastify";
import { appRoutes } from "./http/routes";

export const app = fastify()

app.register(appRoutes)

app.listen({ port: env.PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address} 🚀`);
});