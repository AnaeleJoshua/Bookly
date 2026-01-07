import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './dto/book.type';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import {Auth0Guard} from '../../Auth-config/auth0.guard'

@UseGuards(Auth0Guard)
@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  books() {
    return this.bookService.findAll();
  }

  @Mutation(() => Book)
  createBook(@Args('input') input: CreateBookInput) {
    return this.bookService.create(input);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateBookInput,
  ) {
    return this.bookService.update(id, input);
  }

  @Mutation(() => Book)
  deleteBook(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.delete(id);
  }
}
