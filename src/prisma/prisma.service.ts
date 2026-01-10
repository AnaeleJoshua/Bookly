import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

  constructor() {
    const dbPath =
      process.env.NODE_ENV === 'production'
        ? path.resolve(process.cwd(), 'prod.db')
        : path.resolve(process.cwd(), 'dev.db');

    super({
      adapter: new PrismaBetterSqlite3({
        url: `file:${dbPath}`,
      }),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
