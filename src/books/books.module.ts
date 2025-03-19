import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

import { UserResponseModule } from '../auth_user/user-response.module';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [UserResponseModule],
  providers: [BooksService,PrismaService],
  controllers: [BooksController],
})

export class BooksModule {}
