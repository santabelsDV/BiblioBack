import { Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService, SignInData } from './auth.service'; // Імпортуйте SignInData
import { AuthGuard } from './guards/auth.guard';
import { AuthenticatedRequest } from './guards/auth.guard';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { Request } from 'express';
import { PassportJwtGuard } from './guards/passport-jwt.guard'; // Імпортуйте стандартний Request

// Переконайтесь, що тип Request розширено глобально (type augmentation)
// Або використовуйте AuthenticatedRequest, якщо він визначений глобально чи імпортований

@Controller('auth-v2')
export class PassportAuthController {

  constructor(private authservice: AuthService) {}

  @UseGuards(PassportLocalGuard)
  @Post('login')
  // Використовуємо стандартний тип Request або розширений
  async login(@Req() request: Request) {
    return this.authservice.signIn(request.user as SignInData);
  }

  @UseGuards(PassportJwtGuard)
  @Get('me')

  getUserInfo(@Req() request: Request) {
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}