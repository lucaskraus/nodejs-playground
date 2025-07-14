import { FastifyRequest, FastifyReply } from 'fastify';

export default async function checkSessionIdExists(req: FastifyRequest, res: FastifyReply) {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    return res
      .status(401)
      .send({ error: 'Unauthorized', message: 'Session ID is required for this route' });
  }
}
