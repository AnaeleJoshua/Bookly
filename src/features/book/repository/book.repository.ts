import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.Book.findMany();
  }

  create(data: { title: string; description: string }) {
    return this.prisma.Book.create({ data });
  }

  update(id: number, data: { title?: string; description?: string }) {
    return this.prisma.Book.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.Book.delete({
      where: { id },
    });
  }
}
