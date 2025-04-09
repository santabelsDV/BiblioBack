 import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
 import { AuthService } from './auth.service';
 import { AuthGuard } from './guards/auth.guard';
import {AuthenticatedRequest} from './guards/auth.guard';

 type AuthInput =  {
   login: string;
   password: string;
 }

@Controller('auth')
export class AuthController {

  constructor(private authservice : AuthService) {
  }



  @Post('login')
  login(@Body() input:AuthInput) {

    return this.authservice.authenticate(input);

  };


  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Req() request: AuthenticatedRequest) { // <-- Використовуйте імпортований тип
    const user = request.user;
    if (!user) { // Бажано додати перевірку, хоча гард мав би це забезпечити
      throw new UnauthorizedException();
    }
    return user;
  }

}
