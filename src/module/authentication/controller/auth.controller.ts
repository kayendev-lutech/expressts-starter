import bcrypt from 'bcryptjs';
import { WrappedRequest } from '@utils/wrapper.util.js';
import { AuthService } from '../service/auth.service.js';
import { AppError, ErrorType } from '../../../errors/app-error.js';
import { User } from '@module/user/entity/user.entity';
import { AppDataSource } from '@config/typeorm.config';

export class AuthController {
  private authService: AuthService;
  private repo = AppDataSource.getRepository(User);

  constructor() {
    this.authService = new AuthService();
  }

  async refresh({ headers, deviceId }: WrappedRequest) {
    try {
      if (!headers.refreshtoken) {
        throw new AppError(ErrorType.Auth, 'Refresh Token Missing', 400);
      }
      const result = await this.authService.refresh(
        headers.refreshtoken,
        deviceId,
      );
      return {
        status: 200,
        data: result,
      };
    } catch (error: any) {
      throw error instanceof AppError
        ? error
        : new AppError(ErrorType.Unknown, error?.message || 'Unknown error', 500, error);
    }
  }

  async login({ body, deviceId }: WrappedRequest) {
    try {
      const result = await this.authService.login(body, deviceId);
      return {
        status: 200,
        data: result,
      };
    } catch (error: any) {
      throw error instanceof AppError
        ? error
        : new AppError(ErrorType.Auth, error?.message || 'Login failed', 401, error);
    }
  }

  async createUser({ body }: WrappedRequest): Promise<any> {
    const rawPassword = body.password;
    if (!rawPassword) {
      throw new AppError(ErrorType.Validation, 'Password is required', 400);
    }
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const userData = {
      ...body,
      password_hash: hashedPassword,
    };
    delete userData.password; // Không lưu password thô

    const newUser = await this.repo.create(userData);
    const savedUser = await this.repo.save(newUser);
    return {
      status: 201,
      data: savedUser,
      message: 'User Registered',
    };
  }

  async logout({ deviceId, user }: WrappedRequest) {
    try {
      await this.authService.logout(user?.userId, deviceId);
      return {
        status: 200,
      };
    } catch (error: any) {
      throw error instanceof AppError
        ? error
        : new AppError(ErrorType.Auth, error?.message || 'Logout failed', 400, error);
    }
  }

  async logAllOut({ user }: WrappedRequest) {
    try {
      await this.authService.logAlOut(user?.userId);
      return {
        status: 200,
      };
    } catch (error: any) {
      throw error instanceof AppError
        ? error
        : new AppError(ErrorType.Auth, error?.message || 'Logout all failed', 400, error);
    }
  }
}