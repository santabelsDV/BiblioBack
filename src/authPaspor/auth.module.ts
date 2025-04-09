import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  PassportAuthController } from './auth.controller';
import { UserResponseModule } from '../auth_user/user-response.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './stategies/local.strategy';
import { JwtStrategy } from './stategies/jwt.strategy';

@Module({
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [PassportAuthController],
  imports: [UserResponseModule,
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  }),
  PassportModule],

})
export class PassportAuthModule {}
