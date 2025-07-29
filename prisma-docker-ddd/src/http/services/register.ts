import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterUserServiceProps {
  name: string
  email: string
  password: string
}

export async function registerUserService({ name, email, password }: RegisterUserServiceProps) {
  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    }
  })
}