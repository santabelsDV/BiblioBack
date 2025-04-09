import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserResponseModule } from '../auth_user/user-response.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UserResponseModule,
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  })],
})
export class AuthModule {}
