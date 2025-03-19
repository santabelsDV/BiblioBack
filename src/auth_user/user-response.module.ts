import { Module } from '@nestjs/common';
import { UserResponseService } from './user-response.service';
import { UserResponseController } from './user-response.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { JwtGenerationService } from '../jwt/jwt-services/generation.service';
import { IdentifyUsersService } from './identify-users/identify-users.service';


@Module({
  providers: [UserResponseService, PrismaService,
    EmailService,JwtGenerationService, IdentifyUsersService
  , IdentifyUsersService],
  controllers: [UserResponseController],
  exports: [UserResponseService, IdentifyUsersService]
})
export class UserResponseModule {}