import { Module } from '@nestjs/common';
import { WorksWithBooksService } from './works_with_books.service';
import { WorksWithBooksController } from './works_with_books.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({

  controllers: [WorksWithBooksController],
  providers: [WorksWithBooksService,PrismaService],
})
export class WorksWithBooksModule {}
