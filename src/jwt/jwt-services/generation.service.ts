import { Injectable } from '@nestjs/common';
import { UserDto } from '../../auth_user/dto/user.dto';
import jwt from 'jsonwebtoken'; // Default import
import * as process from 'node:process';

@Injectable()
export class JwtGenerationService {

  generateAccessToken(dto: UserDto): string {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined');
    }

    const payload = {
      id: dto.id,
      login: dto.login,
      email: dto.email,
      status: dto.status,
    };

    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  }

  generateRefreshToken(dto: UserDto): string {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined');
    }

    const payload = {
      id: dto.id,
      login: dto.login,
      email: dto.email,
      status: dto.status,
    };

    return jwt.sign(payload, secretKey, { expiresIn: '12h' });
  }
}
