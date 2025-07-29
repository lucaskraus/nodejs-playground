import { hash } from "bcryptjs"
import { UserRepository } from "@/http/repositories/users"

interface RegisterUserUseCaseProps {
    name: string
    email: string
    password: string
}

class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: RegisterUserUseCaseProps) {
    const passwordHash = await hash(password, 6)

    await this.userRepository.create({ name, email, password_hash: passwordHash })
  }
}

export { RegisterUserUseCase }