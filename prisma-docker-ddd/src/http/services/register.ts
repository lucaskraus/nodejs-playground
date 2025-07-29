
import { hash } from "bcryptjs";
import { registerUserRepository } from "../repositories/register";

interface RegisterUserServiceProps {
  name: string
  email: string
  password: string
}

export async function registerUserService({ name, email, password }: RegisterUserServiceProps) {
  const password_hash = await hash(password, 6)

  await registerUserRepository({ name, email, password: password_hash })
}