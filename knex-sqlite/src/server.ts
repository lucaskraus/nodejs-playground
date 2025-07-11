import fastify from "fastify";
import { knex } from "./database";

const server = fastify();

server.get("/", async (req, res) => {
  const tables = await knex('sqlite_schema').select('*');
  
  return tables;
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address} ✅`);
});