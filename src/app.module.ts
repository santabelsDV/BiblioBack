import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UserResponseModule } from './user-responce/user-response.module';



@Module({
  controllers: [],
  providers: [AppService],
  imports: [BooksModule, UserResponseModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply().forRoutes('books');

  }

}
