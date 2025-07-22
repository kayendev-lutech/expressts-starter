import { UserRepository } from '../repository/user.respository.js';
import { User } from '../entity/user.entity.js';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async me(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.me(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}