import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './dto/book.type';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Auth0Guard } from 'src/Auth config/auth0.guard';
import { UseGuards } from '@nestjs/common';


@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(Auth0Guard)
  @Query(() => [Book])
  books() {
    return this.bookService.findAll();
  }

   @UseGuards(Auth0Guard)
  @Mutation(() => Book)
  createBook(@Args('input') input: CreateBookInput) {
    return this.bookService.create(input);
  }

   @UseGuards(Auth0Guard)
  @Mutation(() => Book)
  updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateBookInput,
  ) {
    return this.bookService.update(id, input);
  }

   @UseGuards(Auth0Guard)
  @Mutation(() => Book)
  deleteBook(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.delete(id);
  }
}
