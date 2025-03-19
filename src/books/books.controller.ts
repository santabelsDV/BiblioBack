import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksDto } from './dto/books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

   @Get()
   findAll() {

     return this.booksService.findAll();
   }
  @Post("save")
  create(@Body() dto: BooksDto){
    return this.booksService.create(dto);
  }
  @Post("update")
  update(@Body() dto: BooksDto){
    return this.booksService.create(dto);
  }
}
