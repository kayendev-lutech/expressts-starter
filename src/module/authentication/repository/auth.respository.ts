import { UserRepository } from '../../user/repository/user.respository.js';
// import { UserRepository } from '../../';

import { TokenRepository } from '../../token/repository/token.respository.js';
import { User } from '../../user/entity/user.entity.js';
import { Token } from '../../token/entity/token.entity.js';

export class AuthRepository {
  private userRespository: UserRepository;
  private tokenRespository: TokenRepository;

  constructor() {
    this.userRespository = new UserRepository();
    this.tokenRespository = new TokenRepository();
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.userRespository.createUser(user);
  }

  async comparePassword(email: string, password: string): Promise<User | null> {
    return this.userRespository.compareUserByPassword(email, password);
  }

  async addToken(data: Partial<Token>) {
    return this.tokenRespository.addToken(data);
  }

  async getToken(userId: string, deviceId: string, token: string) {
    return this.tokenRespository.getToken(userId, deviceId, token);
  }

  async updateToken(id: string, data: Partial<Token>) {
    return this.tokenRespository.updateTokenBasedOnId(id, data);
  }

  async revoke(userId: string, deviceId: string) {
    return this.tokenRespository.revokeTokenBasedOnDeviceId(userId, deviceId);
  }

  async revokeAll(userId: string) {
    return this.tokenRespository.revokeAllToken(userId);
  }
}