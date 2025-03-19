import { Injectable } from '@nestjs/common';


import { BooksDto } from './dto/books.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {};


  findAll(){
    return this.prisma.book.findMany();
  };

  create(dto: BooksDto) {
    return this.prisma.book.create({
      data: dto
    });
  }

}
