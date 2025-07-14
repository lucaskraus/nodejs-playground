import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { Transaction } from '../types';

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/', async (req, res) => {
    const transactions = await knex('transactions').select('*');
    return res.status(200).send({ transactions });
  });

  app.get('/:id', async (req, res) => {
    const getTransactionParamsSchema = z.object({
      id: z.uuid(),
    });
    const { id } = getTransactionParamsSchema.parse(req.params);

    const transaction = await knex('transactions').where('id', id).first();

    if (!transaction) {
      return res.status(404).send({ error: 'Transaction not found' });
    }

    return res.status(200).send({ ...transaction });
  });

  app.get('/summary', async (req, res) => {
    const summary = await knex('transactions').sum('amount', { as: 'amount' }).first();
    return res.status(200).send({ summary });
  });

  app.post('/', async (req, res) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(req.body as Transaction);

    const id = randomUUID();

    await knex('transactions').insert({
      id,
      title,
      amount: type === 'credit' ? amount : amount * -1,
      type,
    });

    return res.status(201).send({ id, message: 'Transaction created successfully' });
  });
}
