import { Module } from '@nestjs/common';
import { UserResponseService } from './user-response.service';
import { UserResponseController } from './user-response.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [UserResponseController],
  providers: [UserResponseService,PrismaService],
})
export class UserResponseModule {}
