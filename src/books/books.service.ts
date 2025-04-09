import { BadRequestException, Injectable } from '@nestjs/common';


import { BooksDto } from './dto/books.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {};


  findAll(){
    return this.prisma.book.findMany();
  };

  async create(dto: BooksDto) {

    const book_object = await this.prisma.book.findMany({
      where: {
        name: dto.name
      }
    })

    if (book_object.length > 0) {
      throw new BadRequestException('This book already exists');
    }

    return this.prisma.book.create({
      data: dto
    });
  }

}
