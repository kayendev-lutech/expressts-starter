import { RegisterUserDto } from '../dto/register.dto.js';
import { AuthRepository } from '../repository/auth.respository.js';
import { LoginUserDto } from '../dto/login.dto.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@utils/jwt.util.js';
import { AppError, ErrorType } from '../../../errors/app-error.js';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(
    createUserDto: RegisterUserDto,
    deviceId: string,
  ): Promise<any> {
    try {
      const userDetails = await this.authRepository.createUser(createUserDto);

      const payload = {
        userId: userDetails?.id,
      };
      const token = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      await this.authRepository.addToken({
        user_id: payload.userId,
        token: refreshToken,
        type: 'refresh',
        created_ip: '', // truyền ip nếu có
        user_agent: deviceId,
      });

      return {
        token: token,
        refreshToken: refreshToken,
      };
    } catch (error: any) {
      throw error instanceof AppError
        ? error
        : new AppError(ErrorType.Validation, error?.message || 'Registration failed', 400, error);
    }
  }

  async login(loginUserDto: LoginUserDto, deviceId: string): Promise<any> {
    try {
      const { email, password } = loginUserDto;
      const userDetails = await this.authRepository.comparePassword(
        email,
        password,
      );

      if (!userDetails) {
        throw new AppError(ErrorType.Auth, 'Invalid credentials', 401);
      }

      const payload = {
        userId: userDetails.id,
      };
      const token = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      await this.authRepository.addToken({
        user_id: payload.userId,
        token: refreshToken,
        type: 'refresh',
        created_ip: '', // truyền ip nếu có
        user_agent: deviceId,
      });

      return {
        token: token,
        refreshToken: refreshToken,
      };
    } catch (error: any) {
      throw error instanceof AppError
        ? error
        : new AppError(ErrorType.Auth, error?.message || 'Login failed', 401, error);
    }
  }

  async refresh(refreshToken: string, deviceId: string) {
    try {
      const payload = verifyRefreshToken(refreshToken) as any;
      const userId = payload.userId;

      const tokenDoc = await this.authRepository.getToken(
        userId,
        deviceId,
        refreshToken,
      );
      if (!tokenDoc)
        throw new AppError(ErrorType.Auth, 'Invalid refresh token', 400);

      let newRefreshToken = refreshToken;

      const newToken = generateRefreshToken({ userId: userId });
      tokenDoc.token = refreshToken;
      const updatedData = await this.authRepository.updateToken(
        tokenDoc.id as string,
        tokenDoc,
      );
      if (updatedData) {
        newRefreshToken = newToken;
      }

      const newAccessToken = generateAccessToken({ userId: userId });
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error: any) {
      throw error instanceof AppError
        ? error
        : new AppError(ErrorType.Auth, error?.message || 'Refresh failed', 400, error);
    }
  }

  async logout(userId: string, deviceId: string) {
    try {
      const result = await this.authRepository.revoke(userId, deviceId);
      return result;
    } catch (error: any) {
      throw error instanceof AppError
        ? error
        : new AppError(ErrorType.Auth, error?.message || 'Logout failed', 400, error);
    }
  }

  async logAlOut(userId: string) {
    try {
      const result = await this.authRepository.revokeAll(userId);
      return result;
    } catch (error: any) {
      throw error instanceof AppError
        ? error
        : new AppError(ErrorType.Auth, error?.message || 'Logout all failed', 400, error);
    }
  }
}