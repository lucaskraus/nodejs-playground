interface UserRepositoryProps {
  name: string
  email: string
  password_hash: string
}

export interface UserRepository {
  create(data: UserRepositoryProps): Promise<UserRepositoryProps>
}