<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Bookly-BE (backend)

This repository contains the backend for Bookly — a small NestJS + GraphQL API using Prisma and SQLite (via the Better SQLite3 adapter). It exposes a simple CRUD GraphQL API for a `Book` model.

Key features:
- NestJS (TypeScript)
- GraphQL (Apollo / code-first schema)
- Prisma ORM with SQLite (`better-sqlite3` adapter)

---

**Prerequisites**
- Node.js 18+ and npm
- Build tools for native modules on Linux (e.g., `build-essential`, `python` for compiling `better-sqlite3` if required)

**Repository layout (important files)**
- `prisma/schema.prisma` — Prisma schema defining the `Book` model. See [prisma/schema.prisma](prisma/schema.prisma)
- `src/prisma.service.ts` — Prisma client service used across the app. See [src/prisma.service.ts](src/prisma.service.ts)
- `src/features/book/book.resolver.ts` — GraphQL resolver exposing queries & mutations. See [src/features/book/book.resolver.ts](src/features/book/book.resolver.ts)
- `src/features/book/book.service.ts` — Business logic / Prisma calls. See [src/features/book/book.service.ts](src/features/book/book.service.ts)
- `src/schema.gql` — Generated GraphQL schema file (auto-generated).
- `package.json` — npm scripts and dependencies. See [package.json](package.json)

---

Getting started
1. Install dependencies

```bash
npm install
```

2. Set the database URL

Create a `.env` file in the project root (or set `DATABASE_URL` in your environment). Example using a file-based SQLite DB:

```env
DATABASE_URL="file:./dev.db"
```

This project uses `@prisma/adapter-better-sqlite3`, which requires `better-sqlite3` (native). On Linux you may need build tools installed (`build-essential` / `gcc` / `make`).

3. Generate Prisma client

```bash
npx prisma generate
```

4. Apply migrations or push schema

- To run migrations (if you plan to use Prisma migrations):

```bash
npx prisma migrate dev --name init
```

- Or simply push the schema (no migration history required):

```bash
npx prisma db push
```

The repository already contains a `prisma/migrations` folder with an initial migration; running `migrate dev` will apply it and create the SQLite file (`dev.db` if using the `.env` example above).

5. Start the development server

```bash
npm run start:dev
```

By default the app listens on port `3000`. Open the GraphQL playground at:

http://localhost:3000/graphql

---

GraphQL API (examples)

Query: list books

```graphql
query {
  books {
    id
    title
    description
  }
}
```

Mutation: create a book

```graphql
mutation {
  createBook(input: { title: "My Book", description: "Short summary" }) {
    id
    title
    description
  }
}
```

Mutation: update a book

```graphql
mutation {
  updateBook(id: 1, input: { title: "Updated title" }) {
    id
    title
    description
  }
}
```

Mutation: delete a book

```graphql
mutation {
  deleteBook(id: 1) {
    id
    title
  }
}
```

---

Scripts
- `npm run start:dev` — Start in watch/development mode
- `npm run start` — Start normally
- `npm run build` — Build the project
- `npm test` — Run unit tests
- `npm run format` — Format code with Prettier

---

Notes & tips
- If Prisma client code does not update after changing `prisma/schema.prisma`, run `npx prisma generate`.
- On fresh clones: run `npm install` and then `npx prisma migrate dev --name init` (or `npx prisma db push`) to create the DB.
- The project uses an adapter to allow `better-sqlite3` with Prisma. If you encounter native build errors, ensure your system has the required build tools and the `node-gyp` chain available.
- If you want to seed the DB, add a seed script and call it from `package.json` or run a small script that uses `PrismaService` to create initial records.

If you want, I can also:
- add `prisma` scripts to `package.json` (`prisma:generate`, `prisma:migrate`)
- add a small seed script

---

Files edited/created by this project work:
- `src/features/book/book.resolver.ts` — GraphQL types & resolvers
- `src/features/book/book.service.ts` — Prisma-backed service

---

If anything in this README should be expanded (examples, CI, Dockerfile, seed data), tell me which piece and I'll add it.
