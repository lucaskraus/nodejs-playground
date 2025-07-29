import { FastifyInstance } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function registerUser(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.email(),
      password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: password,
      }
    })

    return reply.status(201).send(user)
  })
}