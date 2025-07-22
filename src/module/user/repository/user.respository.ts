import { AppDataSource } from '../../../config/typeorm.config.js';
import { User } from '../entity/user.entity.js';
import bcrypt from 'bcryptjs';

export class UserRepository {
  private repo = AppDataSource.getRepository(User);

  async me(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async createUser(user: Partial<User>) {
    const hashedPassword = await bcrypt.hash(user.password_hash!, 10);
    const newUser = this.repo.create({ ...user, password_hash: hashedPassword });
    return this.repo.save(newUser);
  }

  async compareUserByPassword(email: string, password: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password_hash);
    return isMatch ? user : null;
  }
}
