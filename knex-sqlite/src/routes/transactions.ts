import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { Transaction } from '../types';
import checkSessionIdExists from '../middlewares/check-session-id-exists';

export async function transactionRoutes(app: FastifyInstance) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.addHook('preHandler', async (req, res) => {
    console.log(`[${req.method}] ${req.url}`);
  });

  app.get('/', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const { sessionId } = req.cookies;

    const transactions = await knex('transactions').where('session_id', sessionId).select('*');
    return res.status(200).send({ transactions });
  });

  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const getTransactionParamsSchema = z.object({
      id: z.uuid(),
    });
    const { id } = getTransactionParamsSchema.parse(req.params);
    const { sessionId } = req.cookies;

    const transaction = await knex('transactions').where({ id, session_id: sessionId }).first();

    if (!transaction) {
      return res.status(404).send({ error: 'Transaction not found' });
    }

    return res.status(200).send({ ...transaction });
  });

  app.get('/summary', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const { sessionId } = req.cookies;
    const summary = await knex('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first();
    return res.status(200).send({ summary });
  });

  app.post('/', async (req, res) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
    });

    const { title, amount } = createTransactionBodySchema.parse(req.body as Transaction);

    let sessionId = req.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();
      res.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    const id = randomUUID();

    await knex('transactions').insert({
      id,
      title,
      amount,
      type: amount > 0 ? 'credit' : 'debit',
      session_id: sessionId,
    });

    return res.status(201).send({ id, message: 'Transaction created successfully' });
  });
}
