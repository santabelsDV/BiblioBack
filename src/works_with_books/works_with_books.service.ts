import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BookDto_for_user_request } from './dto/create_book_for_user_request.dto';
import {
  BookDto_for_DB_get,
  BookDto_for_DB_post,
} from './dto/create_book_for_DB_.dto';

@Injectable()
export class WorksWithBooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: BookDto_for_user_request) {
    const book_object = await this.prisma.book.findMany({
      where: {
        name: dto.name,
      },
    });

    if (book_object && book_object.length > 0) {
      throw new BadRequestException('This book already exists');
    }

    const author = await this.prisma.author.findMany({
      where: {
        name: dto.authorName,
      },
    });

    if (!author || author.length === 0) {
      throw new BadRequestException('Author not found');
    }

    const authorId = author[0].id;
    const book: BookDto_for_DB_post = {
      name: dto.name,
      page: dto.page,
      titlefoto: dto.titlefoto,
      shortHistory: dto.shortHistory,
      authorId: authorId,
    };

    const book_in_db: BookDto_for_DB_get = await this.prisma.book.create({
      data: book,
    });

    return {
      message: 'Book successfully created',
      bookId: book_in_db.id,
    };
  }
}
