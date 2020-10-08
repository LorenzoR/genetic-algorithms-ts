export interface UserRepositoryInterface {
  getByEmail(email: string): Promise<User>;
  put(user: User): Promise<boolean>;
}
