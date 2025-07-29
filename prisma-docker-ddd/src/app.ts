
import { env } from "./env";
import fastify from "fastify";

export const app = fastify()

app.listen({ port: env.PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address} 🚀`);
});