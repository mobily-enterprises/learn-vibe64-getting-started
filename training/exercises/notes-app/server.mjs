import { createServer } from 'node:http';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
let host = '127.0.0.1', port = 8080;
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
  if (args[i] === '--host' && args[i + 1]) host = args[i + 1];
  else if (args[i] === '--port' && /^\d+$/u.test(args[i + 1] || '')) port = Number(args[i + 1]);
  else throw new Error('Use --host <address> --port <number>.');
}
// The Stack declares this file as the project's SQLite database resource.
const filename = path.resolve(process.env.NOTES_DATABASE || 'data/notes.sqlite');
mkdirSync(path.dirname(filename), { recursive: true });
const db = new DatabaseSync(filename);
db.exec(`PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS notebooks (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY,
  notebook_id INTEGER NOT NULL REFERENCES notebooks(id),
  title TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);`);
if (!db.prepare('SELECT COUNT(*) AS count FROM notebooks').get().count) {
  db.exec(`INSERT INTO notebooks (name) VALUES ('Home'), ('Work');
INSERT INTO notes (notebook_id, title) VALUES (1, 'Buy bread'), (2, 'Plan the team meeting');`);
}
const assets = new Map([['/', ['index.html', 'text/html']], ['/client.js', ['client.js', 'text/javascript']]]
  .map(([route, [file, type]]) => [route, { bytes: readFileSync(new URL(`./public/${file}`, import.meta.url)), type }]));
function json(response, status, value) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  response.end(JSON.stringify(value));
}
async function readJson(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk.toString('utf8');
    if (body.length > 4096) throw new Error('Request too large.');
  }
  return JSON.parse(body);
}
const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://notes.local');
  try {
    if (request.method === 'GET' && url.pathname === '/api/health') return json(response, 200, { status: 'ready' });
    if (request.method === 'GET' && url.pathname === '/api/notebooks') {
      return json(response, 200, db.prepare('SELECT id, name FROM notebooks ORDER BY name').all());
    }
    if (request.method === 'GET' && url.pathname === '/api/notes') {
      return json(response, 200, db.prepare(`SELECT notes.id, notes.title, notes.created_at, notebooks.name AS notebook
        FROM notes JOIN notebooks ON notebooks.id = notes.notebook_id ORDER BY notes.id`).all());
    }
    if (request.method === 'POST' && url.pathname === '/api/notes') {
      const input = await readJson(request);
      const title = typeof input?.title === 'string' ? input.title.trim() : '';
      if (!title || title.length > 200 || !Number.isInteger(input.notebookId)) {
        return json(response, 400, { error: 'Give the note a title and choose a notebook.' });
      }
      const row = db.prepare('INSERT INTO notes (notebook_id, title) VALUES (?, ?) RETURNING id').get(input.notebookId, title);
      return json(response, 201, row);
    }
    const asset = request.method === 'GET' && assets.get(url.pathname);
    if (asset) {
      response.writeHead(200, { 'content-type': `${asset.type}; charset=utf-8`, 'cache-control': 'no-store' });
      return response.end(asset.bytes);
    }
    json(response, 404, { error: 'Not found.' });
  } catch (error) {
    if (!response.headersSent) json(response, 400, { error: error.message });
  }
});
server.listen(port, host, () => console.log(`Notes app listening on ${host}:${server.address().port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => { server.close(); db.close(); });
