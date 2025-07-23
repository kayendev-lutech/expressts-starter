import dayjs from 'dayjs';
import { RegisterUserDto } from '../dto/register.dto.js';
import { AuthRepository } from '../repository/auth.respository.js';
import { LoginUserDto } from '../dto/login.dto.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@utils/jwt.util.js';
import {
  AppError,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  InternalServerErrorException,
} from '../../../errors/app-error.js';

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
      // Check if user exists by email or username
      const existUser = await this.authRepository.userRespository['repo'].findOne({
        where: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      });
      if (existUser) {
        throw new ConflictException('User already exists');
      }
      // Set default role
      const userWithRole = {
        ...createUserDto,
        role: 'user',
      };

      const userDetails = await this.authRepository.createUser(userWithRole);

      const payload = {
        userId: userDetails?.id,
      };
      const token = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      await this.authRepository.addToken({
        user_id: payload.userId,
        token: refreshToken,
        type: 'refresh',
        expires_at: dayjs().add(7, 'day').toDate(),
        created_ip: '', 
        user_agent: deviceId,
      });

      return {
        token: token,
        refreshToken: refreshToken,
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new BadRequestException(error?.message || 'Registration failed', error);
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
        created_ip: '', 
        expires_at: dayjs().add(7, 'day').toDate(),
        user_agent: deviceId,
      });

      return {
        token: token,
        refreshToken: refreshToken,
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new UnauthorizedException(error?.message || 'Login failed', error);
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
      if (error instanceof AppError) throw error;
      throw new UnauthorizedException(error?.message || 'Refresh failed', error);
    }
  }

  async logout(userId: string, deviceId: string) {
    try {
      const result = await this.authRepository.revoke(userId, deviceId);
      return result;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new BadRequestException(error?.message || 'Logout failed', error);
    }
  }

  async logAlOut(userId: string) {
    try {
      const result = await this.authRepository.revokeAll(userId);
      return result;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new BadRequestException(error?.message || 'Logout all failed', error);
    }
  }
}