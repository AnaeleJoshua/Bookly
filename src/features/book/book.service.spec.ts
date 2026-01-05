// book.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { BookService } from './book.service';
import { BookRepository } from './repository/book.repository';

describe('BookService', () => {
  let service: BookService;
  let repository: BookRepository;

  const mockBookRepository = {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: BookRepository, useValue: mockBookRepository },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<BookRepository>(BookRepository);

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all books', async () => {
      const books = [{ id: 1, title: 'Test Book', description: 'Desc' }];
      mockBookRepository.findAll.mockResolvedValue(books);

      const result = await service.findAll();
      expect(result).toEqual(books);
      expect(mockBookRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a book', async () => {
      const dto = { title: 'New Book', description: 'Desc' };
      const createdBook = { id: 1, ...dto };
      mockBookRepository.create.mockResolvedValue(createdBook);

      const result = await service.create(dto);
      expect(result).toEqual(createdBook);
      expect(mockBookRepository.create).toHaveBeenCalledWith(dto);
    });

    it('should throw BadRequestException if title is empty', async () => {
      const dto = { title: '   ', description: 'Desc' };
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
      expect(mockBookRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const id = 1;
      const dto = { title: 'Updated Title' };
      const updatedBook = { id, ...dto };
      mockBookRepository.update.mockResolvedValue(updatedBook);

      const result = await service.update(id, dto);
      expect(result).toEqual(updatedBook);
      expect(mockBookRepository.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('delete', () => {
    it('should delete a book', async () => {
      const id = 1;
      mockBookRepository.delete.mockResolvedValue({ deleted: true });

      const result = await service.delete(id);
      expect(result).toEqual({ deleted: true });
      expect(mockBookRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
