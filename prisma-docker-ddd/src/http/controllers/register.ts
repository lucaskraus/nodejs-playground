import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaRegisterUserRepository } from "../repositories/register";
import { RegisterUserUseCase } from "@/use-cases/register";

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUserRepository = new PrismaRegisterUserRepository()
    const registerUserUseCase = new RegisterUserUseCase(prismaUserRepository)
    
    await registerUserUseCase.execute({ name, email, password })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }

  return reply.status(201).send({ message: 'User created successfully' })
}