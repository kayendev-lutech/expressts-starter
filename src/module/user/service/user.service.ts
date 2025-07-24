import { UserRepository } from '../repository/user.respository.js';
import { User } from '../entity/user.entity.js';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async me(id: string): Promise<User | null> {
    return this.userRepository.me(id);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getById(id: string): Promise<User | null> {
    return this.userRepository.me(id);
  }

  async createUser(data: Partial<User>): Promise<User> {
    return this.userRepository.createUser(data);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    await this.userRepository.repo.update({ id }, data);
    return this.userRepository.me(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.repo.delete({ id });
  }
}