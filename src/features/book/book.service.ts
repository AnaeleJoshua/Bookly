import { Injectable } from '@nestjs/common';
import { BookRepository } from './repository/book.repository';

@Injectable()
export class BookService {
	constructor(
		private readonly bookRepository: BookRepository
	) {}

	async findAll() {
		return this.bookRepository.findAll();
	}

	async create(data: { title: string; description: string }) {
		// Business rule example
		if (!data.title.trim()) {
			throw new Error('Book title cannot be empty');
		}

		return this.bookRepository.create(data);
	}

	async update(
		id: number,
		data: { title?: string; description?: string },
	) {
		return this.bookRepository.update(id, data);
	}

	async delete(id: number) {
		return this.bookRepository.delete(id);
	}
}
