import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { Script, createContext } from 'node:vm';
import { mountVisual } from '../training/visuals/client-server/controller.js';

// Exact client source in an isolated, controlled page harness. This proves fences,
// not real trusted gestures, browser rendering or foreground Preview visibility.
const clientSource = await readFile(new URL('../training/exercises/orientation-app/public/client.js', import.meta.url), 'utf8');
async function page(serverInstanceId) {
  const listeners = new Map(), frames = [], observations = [], announcements = [];
  const button = { disabled: true, addEventListener(name, handler) { listeners.set(`button:${name}`, handler); } };
  const result = { textContent: '' }, reference = { textContent: '' };
  const document = { hidden: false, querySelector(selector) { return { '#ask': button, '#result': result, '#reference': reference }[selector]; } };
  const parent = { postMessage(value) { announcements.push(value); } };
  const window = { parent, addEventListener(name, handler) { listeners.set(name, handler); } };
  let currentServer = serverInstanceId;
  let channelClosed = false;
  const port = { start() {}, close() { channelClosed = true; }, postMessage(value) { observations.push(value); } };
  const replies = [];
  const context = createContext({
    window, document, AbortSignal, crypto: { randomUUID },
    requestAnimationFrame(callback) { frames.push(callback); },
    async fetch(url, options) {
      assert.equal(options.credentials, 'same-origin');
      if (url === '/api/instance') return { ok: true, async json() { return { instanceId: currentServer }; } };
      assert.equal(url, '/api/greeting');
      const input = JSON.parse(options.body);
      const row = { instanceId: currentServer, interactionId: input.interactionId, requestId: randomUUID(), message: 'Hello from the server!' };
      replies.push(row);
      return { ok: true, async json() { return row; } };
    }
  });
  await new Script(`(async () => {\n${clientSource}\n})()`, { filename: 'orientation-client.js' }).runInContext(context);
  const playerInstanceId = randomUUID();
  listeners.get('message')({ source: parent, data: { type: 'orientation-init', protocolVersion: 1, playerInstanceId }, ports: [port] });
  assert.equal(observations[0].type, 'ready');
  assert.equal(observations[0].instanceId, serverInstanceId);
  return {
    button, result, reference, observations, announcements, replies,
    setServer(value) { currentServer = value; },
    async click() { await listeners.get('button:click')({ isTrusted: true }); },
    frame() { const callback = frames.shift(); assert.ok(callback, 'Expected a queued display callback.'); callback(); },
    closed() { return channelClosed; }
  };
}

const originalInstance = randomUUID();
const beforeRestart = await page(originalInstance);
const nextInstance = randomUUID();
beforeRestart.setServer(nextInstance);
await beforeRestart.click();
assert.equal(beforeRestart.button.disabled, true);
assert.equal(beforeRestart.closed(), true);
assert.match(beforeRestart.result.textContent, /Reload preview/u);
assert.equal(beforeRestart.observations.some(row => row.type === 'response-displayed'), false);
await beforeRestart.click();
assert.equal(beforeRestart.replies.length, 1, 'Disabled stale page must not issue another request.');
const afterReload = await page(nextInstance);
assert.equal(afterReload.announcements[0].instanceId, nextInstance);
await afterReload.click(); afterReload.frame();
assert.equal(afterReload.observations.at(-1).type, 'response-displayed');
assert.equal(afterReload.observations.at(-1).instanceId, nextInstance);
console.log('PASS: changed server instance closes stale channel, requires Reload preview, then new page/channel succeeds.');

const consecutive = await page(randomUUID());
await consecutive.click();
const older = consecutive.replies[0];
await consecutive.click();
const newer = consecutive.replies[1];
assert.equal(older.message, newer.message, 'Regression must exercise identical greeting text.');
consecutive.frame();
assert.equal(consecutive.observations.some(row => row.type === 'response-displayed'), false, 'Older identical greeting callback cannot report the newer render.');
consecutive.frame();
assert.equal(consecutive.observations.at(-1).requestId, newer.requestId);
assert.equal(consecutive.observations.filter(row => row.type === 'response-displayed').length, 1);
await consecutive.click();
consecutive.reference.textContent = `Request reference: ${older.requestId}`;
consecutive.frame();
assert.equal(consecutive.observations.filter(row => row.type === 'response-displayed').length, 1, 'Mismatched displayed request reference cannot emit evidence.');
console.log('PASS: display observation requires current render revision, exact request and displayed reference.');

const nodes = new Map(['client', 'server', 'port', 'packet', 'description', 'request-label', 'response-label', 'work-label', 'port-label'].map(id => [id, { style: {}, textContent: '' }]));
const svg = { querySelector(selector) { return nodes.get(selector.slice(1)); } };
const receipts = [];
const port = { start() {}, close() {}, postMessage(value) { receipts.push(value); } };
const playerInstanceId = 'regression-player';
const dispose = mountVisual(svg, port, { protocolVersion: 1, playerInstanceId, initialState: 'overview', reducedMotion: true });
async function command(commandId, name, parameters = {}) {
  port.onmessage({ data: { protocolVersion: 1, playerInstanceId, type: 'command', commandId, name, parameters } });
  await Promise.resolve();
  return receipts.at(-1);
}
const clientReceipt = await command('client-once', 'highlightClient');
assert.equal(clientReceipt.state, 'client-highlighted');
const serverReceipt = await command('server-next', 'highlightServer');
assert.equal(serverReceipt.state, 'server-highlighted');
const replay = await command('client-once', 'highlightClient');
assert.deepEqual(replay, clientReceipt, 'Retry must return original state and description together.');
port.onmessage({ data: { protocolVersion: 1, playerInstanceId, type: 'snapshot', requestId: 'current-display' } });
assert.equal(receipts.at(-1).state, 'server-highlighted', 'Cached result must not alter current display.');
assert.equal(receipts.at(-1).paused, false);
assert.deepEqual(receipts.at(-1).labels, { port: 'Listening service', request: 'Browser asks', work: 'Receives and handles requests', response: 'Server replies' }, 'Fresh initialization keeps declared defaults.');
assert.equal(nodes.get('description').textContent, serverReceipt.description);
console.log('PASS: cached visual result preserves original completion state; snapshot and drawing retain current state.');
await command('port-label', 'highlightPort', { label: 'Service on port 8080' });
await command('request-label', 'sendRequest', { method: 'POST', path: '/api/greeting' });
await command('work-label', 'showServerWork', { label: 'Prepare a greeting' });
await command('response-label', 'sendResponse', { label: 'A real greeting' });
await command('pause-to-resume', 'pause');
port.onmessage({ data: { protocolVersion: 1, playerInstanceId, type: 'snapshot', requestId: 'save-semantic-state' } });
const saved = receipts.at(-1);
const semantic = { state: saved.state, paused: saved.paused, labels: { ...saved.labels } };
assert.equal(semantic.state, 'response-arrived');
assert.equal(semantic.paused, true);
dispose();
const restoredNodes = new Map([...nodes.keys()].map(id => [id, { style: {}, textContent: '' }]));
const restoredSvg = { querySelector(selector) { return restoredNodes.get(selector.slice(1)); } };
const restoredReceipts = [];
const restoredPort = { start() {}, close() {}, postMessage(value) { restoredReceipts.push(value); } };
const restoredInit = { protocolVersion: 1, playerInstanceId: 'restored-player', initialState: semantic.state, reducedMotion: true, snapshot: semantic };
const disposeRestored = mountVisual(restoredSvg, restoredPort, restoredInit);
assert.equal(restoredReceipts[0].type, 'ready');
assert.equal(restoredReceipts[0].state, saved.state);
assert.equal(restoredReceipts[0].description, saved.description);
for (const [key, value] of Object.entries(saved.labels)) assert.equal(restoredNodes.get(`${key}-label`).textContent, value, 'Labels must be restored before ready.');
semantic.labels.port = 'Changed caller data';
restoredPort.onmessage({ data: { protocolVersion: 1, playerInstanceId: 'restored-player', type: 'snapshot', requestId: 'restored-current-state' } });
assert.equal(restoredReceipts.at(-1).paused, true);
assert.deepEqual(restoredReceipts.at(-1).labels, saved.labels, 'Mount must copy snapshot labels rather than retain caller mutation.');
disposeRestored();
const valid = { state: saved.state, paused: saved.paused, labels: { ...saved.labels } };
const malformed = [
  null,
  [],
  { ...valid, state: 'not-a-state' },
  { ...valid, paused: 'yes' },
  { ...valid, extra: true },
  { ...valid, labels: { ...valid.labels, extra: 'unapproved' } },
  { ...valid, labels: { port: valid.labels.port, request: valid.labels.request, work: valid.labels.work } },
  { ...valid, labels: { ...valid.labels, port: 'x'.repeat(29) } },
  { ...valid, labels: { ...valid.labels, request: 'x'.repeat(34) } },
  { ...valid, labels: { ...valid.labels, work: 'x'.repeat(33) } },
  { ...valid, labels: { ...valid.labels, response: 'x'.repeat(33) } },
  { ...valid, labels: { ...valid.labels, work: 'two\nlines' } },
  { ...valid, labels: { ...valid.labels, response: '' } }
];
const receiptCountBeforeInvalid = restoredReceipts.length;
for (const snapshot of malformed) assert.throws(() => mountVisual(restoredSvg, restoredPort, { ...restoredInit, snapshot }), /Invalid/u);
assert.throws(() => mountVisual(restoredSvg, restoredPort, { ...restoredInit, initialState: 'overview', snapshot: valid }), /Invalid semantic snapshot/u);
assert.equal(restoredReceipts.length, receiptCountBeforeInvalid, 'Invalid restoration must not emit ready.');
console.log('PASS: semantic snapshot restores paused/custom labels/state before ready, copies labels and rejects malformed/disagreeing inputs.');
console.log('Not proved: real browser gesture/display, frame visibility, sandbox handshake, host admission or durable grading.');
