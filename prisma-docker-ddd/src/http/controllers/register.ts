import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { registerUserService } from "@/http/services/register";

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  await registerUserService({ name, email, password })

  return reply.status(201).send({ message: 'User created successfully' })
}