import dayjs from 'dayjs';
import { RegisterUserDto } from '@module/authentication/dto/register.dto.js';
import { AuthRepository } from '@module/authentication/repository/auth.respository.js';
import { LoginUserDto } from '@module/authentication/dto/login.dto.js';
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
} from '@errors/app-error.js';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(createUserDto: RegisterUserDto, deviceId: string): Promise<any> {
    const existUser = await this.authRepository.findUserByEmailOrUsername(
      createUserDto.email,
      createUserDto.username,
    );
    if (existUser) {
      throw new ConflictException('User already exists');
    }
    const userWithRole = { ...createUserDto, role: 'user' };
    const userDetails = await this.authRepository.createUser(userWithRole);
    const payload = { userId: userDetails?.id };
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

    return { token, refreshToken };
  }

  async login(loginUserDto: LoginUserDto, deviceId: string): Promise<any> {
    const { email, password } = loginUserDto;
    const userDetails = await this.authRepository.comparePassword(
      email,
      password,
    );

    if (!userDetails) {
      throw new UnauthorizedException('Invalid credentials');
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
      expires_at: dayjs().add(7, 'day').toDate(),
      created_ip: '', 
      user_agent: deviceId,
    });

    return {
      token: token,
      refreshToken: refreshToken,
    };
  }

  async refresh(refreshToken: string, deviceId: string) {
    const payload = verifyRefreshToken(refreshToken) as any;
    const userId = payload.userId;

    const tokenDoc = await this.authRepository.getToken(
      userId,
      deviceId,
      refreshToken,
    );
    if (!tokenDoc)
      throw new UnauthorizedException('Invalid refresh token');

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
  }

  async logout(userId: string, deviceId: string) {
    return await this.authRepository.revoke(userId, deviceId);
  }

  async logAlOut(userId: string) {
    return await this.authRepository.revokeAll(userId);
  }

}