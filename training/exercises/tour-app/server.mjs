import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

// The page is read from disk on every request, so an edit to public/index.html
// shows after a plain Reload preview, without restarting this server.
let host = '127.0.0.1', port = 8080;
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
  if (args[i] === '--host' && args[i + 1]) host = args[i + 1];
  else if (args[i] === '--port' && /^\d+$/u.test(args[i + 1] || '')) port = Number(args[i + 1]);
  else throw new Error('Use --host <address> --port <number>.');
}
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Invalid port.');

const page = new URL('./public/index.html', import.meta.url);
// Vibe64's Preview injects one inline bridge script into HTML without a nonce, so
// script-src allows inline scripts. The page has no script of its own.
const pageHeaders = {
  'content-type': 'text/html; charset=utf-8',
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
  'content-security-policy': "default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors *; base-uri 'none'; form-action 'none'"
};

function json(response, status, value) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
  response.end(JSON.stringify(value));
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://exercise.local');
  if (request.method === 'GET' && url.pathname === '/api/health') return json(response, 200, { status: 'ready' });
  if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
    try {
      const bytes = await readFile(page);
      response.writeHead(200, pageHeaders);
      response.end(bytes);
    } catch {
      json(response, 500, { error: 'public/index.html could not be read.' });
    }
    return;
  }
  json(response, 404, { error: 'Not found.' });
});
server.requestTimeout = 5000; server.headersTimeout = 5000;
server.listen(port, host, () => console.log(`Tour app listening on ${host}:${server.address().port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => { server.close(); server.closeAllConnections(); });
