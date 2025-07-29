import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@/generated/prisma";
import { UserRepository } from "./users";

export class PrismaRegisterUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data })
    return user
  }
}