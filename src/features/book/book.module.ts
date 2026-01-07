import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { BookRepository } from './repository/book.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import {AuthModule} from '../../Auth-config/Auth.module'

@Module({
  imports: [PrismaModule,AuthModule],
  providers: [BookService, BookResolver, BookRepository],
})
export class BookModule {}
