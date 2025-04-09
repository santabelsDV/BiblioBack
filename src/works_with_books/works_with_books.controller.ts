import { Controller, Post, Body } from '@nestjs/common';
import { WorksWithBooksService } from './works_with_books.service';
import { BookDto_for_user_request } from './dto/create_book_for_user_request.dto';

@Controller('books')
export class WorksWithBooksController {
  constructor(private readonly worksWithBooksService: WorksWithBooksService) {}

    @Post('create')
  create(@Body() dto: BookDto_for_user_request) {
    return this.worksWithBooksService.create(dto);
  }
}
