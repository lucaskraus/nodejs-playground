
import { hash } from "bcryptjs";
import { PrismaRegisterUserRepository } from "../repositories/register";

interface RegisterUserServiceProps {
  name: string
  email: string
  password: string
}

export async function registerUserService({ name, email, password }: RegisterUserServiceProps) {
  const password_hash = await hash(password, 6)

  const prismaRegisterUserRepository = new PrismaRegisterUserRepository()

  await prismaRegisterUserRepository.create({
    name,
    email,
    password_hash,
  })
}