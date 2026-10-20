import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
let host = '127.0.0.1', port = 8080;
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
  if (args[i] === '--host' && args[i + 1]) host = args[i + 1];
  else if (args[i] === '--port' && /^\d+$/u.test(args[i + 1] || '')) port = Number(args[i + 1]);
  else throw new Error('Use --host <address> --port <number>.');
}
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Invalid port.');
const greetingFile = new URL('./greeting.mjs', import.meta.url);
const assets = new Map(await Promise.all([['/', 'index.html', 'text/html'], ['/client.js', 'client.js', 'text/javascript']].map(async ([route, file, type]) => [route, { bytes: await readFile(new URL(`./public/${file}`, import.meta.url)), type }])));
let presses = 0;
// Load the saved greeting.mjs again whenever it changes, so a saved edit shows on
// the next press without restarting Preview. Each saved version is loaded once.
async function loadGreeting() {
  const { mtimeMs } = await stat(greetingFile);
  const module = await import(`${greetingFile.href}?saved=${mtimeMs}`);
  if (typeof module.greeting !== 'function') throw new Error('it no longer exports a function called greeting.');
  return module.greeting;
}
function json(response, status, value) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' }); response.end(JSON.stringify(value));
}
const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://exercise.local');
  if (request.method === 'GET' && url.pathname === '/api/health') return json(response, 200, { status: 'ready' });
  if (request.method === 'POST' && url.pathname === '/api/greeting') {
    presses += 1;
    try {
      const message = await (await loadGreeting())(presses);
      if (typeof message !== 'string' || !message.trim()) return json(response, 500, { presses, error: 'greeting() did not give back any text to show.' });
      return json(response, 200, { presses, message: message.slice(0, 500) });
    } catch (error) {
      return json(response, 500, { presses, error: `greeting.mjs has a problem: ${String(error?.message || error).slice(0, 300)}` });
    }
  }
  const asset = request.method === 'GET' && assets.get(url.pathname);
  if (asset) {
    // Vibe64's Preview injects one inline bridge script into HTML; it has no nonce or hash support, so
    // script-src also allows inline scripts. This page has no inline script of its own and writes only text.
    response.writeHead(200, { 'content-type': `${asset.type}; charset=utf-8`, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', 'content-security-policy': "default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; frame-ancestors *; base-uri 'none'; form-action 'none'" }); response.end(asset.bytes); return;
  }
  json(response, 404, { error: 'Not found.' });
});
server.requestTimeout = 5000; server.headersTimeout = 5000;
server.listen(port, host, () => console.log(`Greeting app listening on ${host}:${server.address().port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => { server.close(); server.closeAllConnections(); });
