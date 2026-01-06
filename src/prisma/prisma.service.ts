import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Resolve absolute path to the DB in your repo root
    const dbPath = path.resolve(process.cwd(), 'dev.db'); 
    console.log('Using SQLite DB at:', dbPath);

    const adapter = new PrismaBetterSqlite3({
      url: `file:${dbPath}`, // must be file:<absolute-path>
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
