import fastify from "fastify";
import { knex } from "./database";
import { randomUUID } from "node:crypto";

const server = fastify();

server.get("/", async (req, res) => {
  const transaction = await knex('transactions').insert({
    id: randomUUID(),
    title: 'New Transaction',
    amount: 100,
    session_id: randomUUID(),
  }).returning('*');

  return transaction;
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address} ✅`);
});