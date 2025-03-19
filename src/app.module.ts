import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { UserResponseModule } from './auth_user/user-response.module';
import { EmailModule } from './email/email.module';
import { JwtModule } from './jwt/jwt.module';
import { WorksWithBooksModule } from './works_with_books/works_with_books.module';




@Module({
  controllers: [],
  imports: [BooksModule, UserResponseModule, EmailModule, JwtModule, WorksWithBooksModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply().forRoutes('books');

  }

}
