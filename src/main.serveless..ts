import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export async function createServer() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://bookly-fe.vercel.app',
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'apollo-require-preflight',
    ],
    credentials: true,
  });

  await app.init();
  return server;
}
