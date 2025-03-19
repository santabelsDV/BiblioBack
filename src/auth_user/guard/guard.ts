import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const isAuth = request.headers.authorization === 'secret'; // Вказав тип
    if (!isAuth) {
      throw new UnauthorizedException(' Unauthorized');
    }
    return isAuth;
  }
}
