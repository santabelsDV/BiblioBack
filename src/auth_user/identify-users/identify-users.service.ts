import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserDto } from '../dto/user.dto';
import { JwtGenerationService } from '../../jwt/jwt-services/generation.service';
import crypto from 'crypto';


@Injectable()
export class IdentifyUsersService{
  constructor(private readonly prisma: PrismaService ,  private readonly jwtService: JwtGenerationService) {}

  async LoginUser(dto: UserLoginDto){
    const hashedPassword: string = crypto
      .createHash('sha256')
      .update(dto.password)
      .digest('hex');

    const user : UserDto | null  = await this.prisma.user.findFirst({
      where: { login: dto.login, password: hashedPassword },
    });

    if (!user || user.password !== hashedPassword) {
      throw new Error('User not found or password is incorrect');
    }

    const accessToken = this.jwtService.generateAccessToken(user);
    const refreshToken = this.jwtService.generateRefreshToken(user);

    await this.prisma.user.updateMany({ where: { login: dto.login }, data: { accessToken : accessToken, refreshToken: refreshToken } });

    return { accessToken : accessToken, refreshToken: refreshToken };
  }



}



