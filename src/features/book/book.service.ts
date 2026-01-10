import { Prisma } from '@prisma/client';

import { BadRequestException, Injectable, InternalServerErrorException, } from '@nestjs/common';
import { BookRepository } from './repository/book.repository';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async findAll() {
    return this.bookRepository.findAll();
  }


   async create(data: { title: string; description: string }) {
    try {
      return await this.bookRepository.create( data );
    } catch (error: any) {
      // Known Prisma errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid book data');
      }

      // SQLite / filesystem / infra errors
      if (
        error.message?.includes('readonly database') ||
        error.message?.includes('read-only')
      ) {
        throw new InternalServerErrorException(
          'Database is not writable. Please contact support.',
        );
      }

      // Fallback
      throw new InternalServerErrorException(
        'Failed to create book',
      );
    }
  }

  async update(id: number, data: { title?: string; description?: string }) {
    
    try {
      return this.bookRepository.update(id, data);
    } catch (error: any) {
      // Known Prisma errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid book data');
      }

      // SQLite / filesystem / infra errors
      if (
        error.message?.includes('readonly database') ||
        error.message?.includes('read-only')
      ) {
        throw new InternalServerErrorException(
          'Database is not writable. Please contact support.',
        );
      }

      // Fallback
      throw new InternalServerErrorException(
        'Failed to update book',
      );
    }
  }

  async delete(id: number) {

     try {
          return this.bookRepository.delete(id);
    } catch (error: any) {
      // Known Prisma errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid book data');
      }

      // SQLite / filesystem / infra errors
      if (
        error.message?.includes('readonly database') ||
        error.message?.includes('read-only')
      ) {
        throw new InternalServerErrorException(
          'Database is not writable. Please contact support.',
        );
      }

      // Fallback
      throw new InternalServerErrorException(
        'Failed to deletebook',
      );
    }
  }
}
