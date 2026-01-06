import { createServer } from './src/main';

export default async function handler(req, res) {
  const server = await createServer();
  return server(req, res);
}
