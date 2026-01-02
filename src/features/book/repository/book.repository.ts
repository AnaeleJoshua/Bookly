import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class BookRepository {
	constructor(private readonly prisma: PrismaService) {}

	findAll() {
		return this.prisma.book.findMany();
	}

	create(data: { title: string; description: string }) {
		return this.prisma.book.create({ data });
	}

	update(
		id: number,
		data: { title?: string; description?: string },
	) {
		return this.prisma.book.update({
			where: { id },
			data,
		});
	}

	delete(id: number) {
		return this.prisma.book.delete({
			where: { id },
		});
	}
}
