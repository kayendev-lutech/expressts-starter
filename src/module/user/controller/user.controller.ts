import { WrappedRequest } from '@utils/wrapper.util.js';
import { UserService } from '../service/user.service.js';
import {
  AppError,
  ErrorCode,
  InternalServerErrorException,
} from '@errors/app-error.js';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async me({ user }: WrappedRequest) {
    try {
      const result = await this.userService.me(user.userId);
      return {
        status: 200,
        data: result,
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to get user info', error);
    }
  }
  async getById({ params }: WrappedRequest) {
    try {
      const user = await this.userService.getById(params.id);
      if (!user) {
        throw new AppError(ErrorCode.ERR_004,'User not found',404);
      }
      return {
        status: 200,
        data: user,
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to get user by id', error);
    }
  }
  async getAll(): Promise<any> {
    try {
      const users = await this.userService.getAll();
      return {
        status: 200,
        data: users,
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to get users', error);
    }
  }
  async updateUser({ params, body }: WrappedRequest) {
    try {
      const updated = await this.userService.updateUser(params.id, body);
      if (!updated) {
        throw new AppError(ErrorCode.ERR_004, 'User not found', 404);
      }
      return {
        status: 200,
        data: updated,
        message: 'User updated',
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to update user', error);
    }
  }
  async deleteUser({ params }: WrappedRequest) {
    try {
      await this.userService.deleteUser(params.id);
      return {
        status: 200,
        message: 'User deleted',
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to delete user', error);
    }
  }
}