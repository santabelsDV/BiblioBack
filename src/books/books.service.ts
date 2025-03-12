import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { BooksDto } from './dto/books.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {};


  findAll(){


    return this.prisma.user.findMany();
  };

  create(dto: BooksDto) {

    return this.prisma.book.create({
      data: dto
    });
  }

}
