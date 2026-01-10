import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const dbPath =
  process.env.NODE_ENV === 'production'
    ? path.resolve(process.cwd(), 'prod.db') // persistent path on VPS / container
    : path.resolve(process.cwd(), 'dev.db');

console.log('Using SQLite DB at:', dbPath);

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: `file:${dbPath}`,
  }),
});

export default prisma;
