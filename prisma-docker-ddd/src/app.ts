import { server } from "./server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


server.listen({ port: 3333, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address} 🚀`);
});