import bcrypt from 'bcryptjs';
import { WrappedRequest } from '@utils/wrapper.util.js';
import { AuthService } from '@module/authentication/service/auth.service.js';
import { User } from '@module/user/entity/user.entity.js';
import { AppDataSource } from '@config/typeorm.config.js';
import {
  AppError,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@errors/app-error.js';

export class AuthController {
  private authService: AuthService;
  private repo = AppDataSource.getRepository(User);

  constructor() {
    this.authService = new AuthService();
  }

  async refresh({ headers, deviceId }: WrappedRequest) {
    try {
      if (!headers.refreshtoken) {
        throw new UnauthorizedException('Refresh Token Missing');
      }

      const result = await this.authService.refresh(headers.refreshtoken, deviceId);

      return {
        status: 200,
        data: result,
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to refresh token', error);
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
      if (error instanceof AppError) throw error;
      throw new UnauthorizedException(error?.message || 'Login failed', error);
    }
  }

  async createUser({ body }: WrappedRequest): Promise<any> {
    try {
      const rawPassword = body.password;
      if (!rawPassword) {
        throw new BadRequestException('Password is required');
      }

      const hashedPassword = await bcrypt.hash(rawPassword, 10);
      const userData = {
        ...body,
        password_hash: hashedPassword,
      };
      delete userData.password;

      const newUser = this.repo.create(userData);
      const savedUser = await this.repo.save(newUser);

      return {
        status: 201,
        data: savedUser,
        message: 'User Registered',
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to create user', error);
    }
  }

  async logout({ deviceId, user }: WrappedRequest) {
    try {
      await this.authService.logout(user?.userId, deviceId);
      return { status: 200 };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new BadRequestException(error?.message || 'Logout failed', error);
    }
  }

  async logAllOut({ user }: WrappedRequest) {
    try {
      await this.authService.logAlOut(user?.userId);
      return { status: 200 };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Logout all failed', error);
    }
  }
}
