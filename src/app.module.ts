import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { UserResponseModule } from './auth_user/user-response.module';
import { EmailModule } from './email/email.module';
import { JwtModule } from './jwt/jwt.module';
import { WorksWithBooksModule } from './works_with_books/works_with_books.module';
import { AuthModule } from './auth/auth.module';
import { PassportAuthModule } from './authPaspor/auth.module';




@Module({
  controllers: [],
  imports: [BooksModule, UserResponseModule, EmailModule, JwtModule, WorksWithBooksModule, AuthModule,PassportAuthModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply().forRoutes('books');

  }

}
