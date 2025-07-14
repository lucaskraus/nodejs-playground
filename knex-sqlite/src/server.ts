import fastify from 'fastify';
import { transactionRoutes } from './routes/transactions';

const server = fastify();

server.register(transactionRoutes, {
  prefix: 'transactions',
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address} ✅`);
});

export default server;
