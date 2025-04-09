import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// Переконайтесь, що імпорт правильний і пакет @types/passport-jwt встановлено
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'node:process';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('Fatal Error: JWT_SECRET environment variable is not set.');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: { sub: string; username: string }): Promise<any> {
    return { userId: payload.sub, username: payload.username };
  }
}