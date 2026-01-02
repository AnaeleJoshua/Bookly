import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { BookRepository } from './repository/book.repository';
@Module({
  providers: [BookService, BookResolver, BookRepository]
})
export class BookModule {}
