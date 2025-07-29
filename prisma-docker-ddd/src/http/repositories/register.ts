import { prisma } from "@/lib/prisma";

interface RegisterUserRepositoryProps {
  name: string
  email: string
  password: string
}

export async function registerUserRepository({ name, email, password }: RegisterUserRepositoryProps) {
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    }
  })
}