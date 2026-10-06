import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
let host = '127.0.0.1', port = 8080;
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
  if (args[i] === '--host' && args[i + 1]) host = args[i + 1];
  else if (args[i] === '--port' && /^\d+$/u.test(args[i + 1] || '')) port = Number(args[i + 1]);
  else throw new Error('Use --host <address> --port <number>.');
}
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Invalid port.');
const instanceId = randomUUID(), observations = new Map();
const uuid = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u.test(value);
const assets = new Map(await Promise.all([['/', 'index.html', 'text/html'], ['/client.js', 'client.js', 'text/javascript']].map(async ([route, file, type]) => [route, { bytes: await readFile(new URL(`./public/${file}`, import.meta.url)), type }])));
function json(response, status, value) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' }); response.end(JSON.stringify(value));
}
const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://exercise.local');
  if (request.method === 'GET' && url.pathname === '/api/health') return json(response, 200, { status: 'ready' });
  if (request.method === 'GET' && url.pathname === '/api/instance') return json(response, 200, { instanceId });
  if (request.method === 'GET' && url.pathname === '/training/observation') {
    const row = observations.get(url.searchParams.get('requestId'));
    return json(response, row ? 200 : 404, row || { error: 'Request expired or unknown. Press the button again.' });
  }
  if (request.method === 'POST' && url.pathname === '/api/greeting') {
    try {
      let body = '';
      for await (const chunk of request) {
        body += chunk.toString('utf8');
        if (body.length > 1024) { json(response, 413, { error: 'Request too large.' }); request.destroy(); return; }
      }
      const input = JSON.parse(body);
      if (!input || Object.keys(input).length !== 1 || !uuid(input.interactionId)) return json(response, 400, { error: 'A valid interaction reference is required.' });
      const row = { instanceId, interactionId: input.interactionId, requestId: randomUUID(), message: 'Hello from the server!' };
      observations.set(row.requestId, row);
      if (observations.size > 64) observations.delete(observations.keys().next().value);
      return json(response, 200, row);
    } catch { if (!response.headersSent) json(response, 400, { error: 'Could not read the request.' }); return; }
  }
  const asset = request.method === 'GET' && assets.get(url.pathname);
  if (asset) {
    response.writeHead(200, { 'content-type': `${asset.type}; charset=utf-8`, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', 'content-security-policy': "default-src 'none'; script-src 'self'; style-src 'unsafe-inline'; connect-src 'self'; frame-ancestors *; base-uri 'none'; form-action 'none'" }); response.end(asset.bytes); return;
  }
  json(response, 404, { error: 'Not found.' });
});
server.requestTimeout = 5000; server.headersTimeout = 5000;
server.listen(port, host, () => console.log(`Orientation app listening on ${host}:${server.address().port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => { server.close(); server.closeAllConnections(); });
