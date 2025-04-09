import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    userid: number;
    username: string;
  };
}

interface JwtPayload {
  sub: number;
  username: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const tokenPayload: JwtPayload = await this.jwtService.verifyAsync<JwtPayload>(token);
      request.user = {
        userid: tokenPayload.sub,
        username: tokenPayload.username,
      };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
