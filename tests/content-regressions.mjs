import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { Script, createContext } from 'node:vm';
import { spawn } from 'node:child_process';
import { cp, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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
assert.deepEqual(receipts.at(-1).labels, { port: 'Running app', request: 'Page asks for a greeting', work: 'Prepares a greeting', response: 'Greeting returns' }, 'Fresh initialization keeps declared defaults.');
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


// Learning v2: pin the step inventory and the evidence each required step relies
// on. Format validation belongs to public Vibe64's `training validate`; this
// only catches accidental changes to what a learner must do in this topic.
const lesson = async code => JSON.parse(await readFile(new URL(`../training/lessons/${code}/lesson.json`, import.meta.url), 'utf8'));
const inventory = descriptor => descriptor.steps.map(({ id, check, required }) => `${id}:${check.kind}${check.check ? `=${check.check}` : ''}${required ? '!' : ''}`);
const lessons = Object.fromEntries(await Promise.all(['V64-START-00', 'V64-START-01', 'V64-START-02', 'V64-START-03'].map(async code => [code, await lesson(code)])));
assert.deepEqual(inventory(lessons['V64-START-00']), ['welcome:none', 'the-page:self!', 'lesson-pane:none', 'see-preview:self!', 'ask-the-chat:self', 'see-the-change:review', 'dashboard:self!', 'current-changes:none', 'save:self', 'where-work-lives:choice!', 'meet-colleague:self!', 'who-does-what:choice!', 'courses-and-l:self!', 'l-pauses:choice!', 'ai-setup:none', 'recap:self!']);
assert.deepEqual(inventory(lessons['V64-START-01']), ['welcome:none', 'help-or-change:choice!', 'try-the-app:auto=orientation-response!', 'what-happened:none', 'preview-purpose:choice!', 'useful-request:choice!', 'recap:none']);
assert.deepEqual(inventory(lessons['V64-START-02']), ['welcome:none', 'try-it-first:self', 'meet-the-file:none', 'change-the-greeting:auto=greeting-count!', 'what-preview-showed:self!', 'why-check-behaviour:choice!', 'replay-the-journey:none', 'recap:none']);
assert.deepEqual(inventory(lessons['V64-START-03']), ['welcome:none', 'add-a-note:self!', 'see-the-rows:self!', 'where-notes-live:choice!', 'read-the-erd:choice!', 'ask-for-a-change:self!', 'see-the-new-column:self', 'recap:none']);
assert.deepEqual(lessons['V64-START-00'].exercise, { kind: 'bundled', source: '../../exercises/tour-app', reuse: 'attempt' });
assert.equal(lessons['V64-START-00'].checks, undefined, 'The introduction has no automatic check.');
assert.deepEqual(lessons['V64-START-01'].checks.map(({ id, file }) => ({ id, file })), [{ id: 'orientation-response', file: '../../checks/orientation-app/response.mjs' }]);
assert.deepEqual(lessons['V64-START-02'].steps.find(step => step.id === 'change-the-greeting').check.files, ['greeting.mjs']);
const visual = JSON.parse(await readFile(new URL('../training/visuals/client-server/visual.json', import.meta.url), 'utf8'));
const declared = new Map(visual.commands.map(entry => [entry.name, entry.parameters]));
// The step bar has no Open button, Step panel or collapse, the header switch
// reads Preview | Dash, the lesson is the Lesson toggle beside it (not a tab or
// a step bar button), and the bar moves with labelled Back and Next, not
// arrows: no text sends the learner to a retired control.
const retiredBarControls = /step bar's\s+\*\*Open\*\*|\*\*Open\*\* brings|folds it to\s+one line|\*\*Step\*\* opens|Step opens the whole step|Answer in Step|Lesson\*{0,2}\s+tab|Select \*{0,2}Dashboard\b|Dashboard\*{0,2} or \*{0,2}Lesson|\*\*Lesson\*\*,? on (the yellow step|this) bar|the right arrow|the arrows go|Its arrows move/u;
for (const [code, descriptor] of Object.entries(lessons)) {
  assert.equal(descriptor.schemaVersion, 3, `${code} uses lesson format v3`);
  assert.equal(descriptor.stage, "project", `${code} is taught in its practice project`);
  const notes = await readFile(new URL(`../training/lessons/${code}/notes.md`, import.meta.url), 'utf8').catch(() => '');
  assert.doesNotMatch(notes, retiredBarControls, `${code} notes name no retired step bar control`);
  for (const step of descriptor.steps) {
    const body = await readFile(new URL(`../training/lessons/${code}/${step.body}`, import.meta.url), 'utf8');
    assert.doesNotMatch(body, retiredBarControls, `${code}/${step.id} names no retired step bar control`);
    if (step.check.kind === 'choice') assert.ok(step.check.answer.every(index => index >= 0 && index < step.check.options.length), `${code}/${step.id} answer in range`);
    for (const { name, parameters } of step.visual?.play || []) {
      const shape = declared.get(name);
      assert.ok(shape, `${code}/${step.id} plays declared command ${name}`);
      for (const { name: parameter, required, maxLength } of shape) {
        if (required) assert.equal(typeof parameters[parameter], 'string', `${code}/${step.id} ${name}.${parameter} supplied`);
        if (parameter in parameters) assert.ok(parameters[parameter].length <= maxLength, `${code}/${step.id} ${name}.${parameter} within ${maxLength}`);
      }
      assert.ok(Object.keys(parameters).every(key => shape.some(entry => entry.name === key)), `${code}/${step.id} ${name} has only declared parameters`);
    }
  }
}
console.log('PASS: v2 step inventory, check evidence and visual play sequences match the declared commands.');

// Lesson 0 is a guided tour: every step ends with a beats block that the step
// bar plays. Pin each step's beat sequence (kind and target) and the few beat
// details the tour relies on; the grammar itself is public `training validate`.
const beatsOf = markdown => {
  const match = /\n```beats\n([\s\S]*?)\n```\n*$/u.exec(markdown);
  return match ? match[1].split('\n').filter(Boolean).map(line => {
    // A review check beat has no text: the bar shows the step's check.rubric.
    if (line === 'check review') return { kind: 'check', target: 'review' };
    const [, kind, target, arg, text] = /^(show|do|check) ([a-z-]+)(?: ([^:]+?))?: (.+)$/u.exec(line) || [];
    assert.ok(kind, `beat line reads <kind> <target>: <text>: ${line}`);
    return { kind, target, arg, text };
  }) : null;
};
const tourBeats = {};
for (const step of lessons['V64-START-00'].steps) {
  assert.equal(step.guide, undefined, `V64-START-00/${step.id} uses beats instead of a guide`);
  tourBeats[step.id] = beatsOf(await readFile(new URL(`../training/lessons/V64-START-00/${step.body}`, import.meta.url), 'utf8'));
  assert.ok(tourBeats[step.id], `V64-START-00/${step.id} ends with a beats block`);
}
const sequence = Object.fromEntries(Object.entries(tourBeats).map(([id, beats]) => [id, beats.map(({ kind, target, arg }) => `${kind} ${target}${arg ? ` ${arg}` : ''}`)]));
assert.deepEqual(sequence, {
  welcome: ['show lesson-bar', 'show lesson', 'show colleague'],
  'the-page': ['show learning', 'show chat', 'show preview', 'show dashboard', 'show colleague', 'check done'],
  'lesson-pane': ['show lesson', 'show lesson-bar', 'show courses'],
  'see-preview': ['do preview', 'show preview', 'show reload-preview', 'check done'],
  'ask-the-chat': ['show chat', 'do send-message', 'do agent-finished', 'check done'],
  'see-the-change': ['do preview', 'do reload-preview', 'show preview', 'check review'],
  dashboard: ['show dashboard', 'do files', 'do file-opened public/index.html', 'check done'],
  'current-changes': ['do changes', 'show changes'],
  save: ['do save', 'do git-log', 'check done'],
  'where-work-lives': ['show lesson-bar'],
  'meet-colleague': ['do colleague', 'do colleague-minimised', 'check done'],
  'who-does-what': ['show lesson-bar'],
  'courses-and-l': ['do courses', 'do learning', 'check done'],
  'l-pauses': ['show learning'],
  'ai-setup': ['show lesson-bar'],
  recap: ['show lesson-bar', 'check done']
});
const checkKind = { done: 'self', review: 'review' };
for (const step of lessons['V64-START-00'].steps) {
  const check = tourBeats[step.id].find(beat => beat.kind === 'check');
  if (check) assert.equal(checkKind[check.target], step.check.kind, `V64-START-00/${step.id} check beat matches its check`);
  else assert.ok(['none', 'choice'].includes(step.check.kind), `V64-START-00/${step.id} ${step.check.kind} check has its check beat`);
}
const [sendBeat] = tourBeats['ask-the-chat'].filter(beat => beat.target === 'send-message');
assert.equal([...sendBeat.text.matchAll(/"([^"]+)"/gu)].length, 1, 'Do it for me sends exactly one quoted prompt');
assert.match(sendBeat.text, /"Please change the heading to say .+ and make the box green\."/u);
// Starting the lesson needs the learner's AI (it prepares the practice
// project), so no beat speaks to a learner who has none connected yet.
assert.ok(Object.values(tourBeats).flat().every(beat => !/no AI connected/iu.test(beat.text || '')), 'no beat assumes no AI is connected');
// The first change is reviewed by the learner's own AI against its check's
// rubric (the single source; its check beat has no text), from the practice
// project's changes only.
const review = lessons['V64-START-00'].steps.find(step => step.id === 'see-the-change');
const { rubric, ...reviewCheck } = review.check;
assert.deepEqual(reviewCheck, { kind: 'review', evidence: ['changes'] });
assert.equal(tourBeats['see-the-change'].at(-1).text, undefined, 'the check review beat carries no rubric text');
assert.equal(review.required, false, 'The reviewed change stays optional: it needs a connected AI.');
assert.ok(typeof rubric === 'string' && rubric.length <= 600, 'rubric fits its 600 characters');
assert.match(rubric, /heading/u); assert.match(rubric, /green/u); assert.match(rubric, /public\/index\.html/u);
const tourPage = await readFile(new URL('../training/exercises/tour-app/public/index.html', import.meta.url), 'utf8');
assert.ok(tourPage.includes('<h1>My first Vibe64 app</h1>') && rubric.includes('My first Vibe64 app'), 'rubric names the starting heading');
console.log('PASS: Lesson 0 beats pin the guided tour, its Do it for me prompt and the reviewed first change.');

// notes.md is shown to the learner as Lesson notes: it must not carry grading
// instructions or the text of a correct choice option.
for (const [code, descriptor] of Object.entries(lessons)) {
  const notes = await readFile(new URL(`../training/lessons/${code}/${descriptor.notes}`, import.meta.url), 'utf8');
  assert.doesNotMatch(notes, /rubric|for Colleague|lesson\.read/iu, `${code} notes are learner-facing`);
  for (const step of descriptor.steps.filter(entry => entry.check.kind === 'choice')) {
    for (const index of step.check.answer) assert.ok(!notes.includes(step.check.options[index]), `${code}/${step.id} answer is not in the notes`);
  }
}
console.log('PASS: lesson notes are learner-facing and reveal no choice answers.');

// The introduction's tour page is read on every request, so a coding-chat edit
// shows after a plain Reload preview. Run a copy so the source stays untouched.
const tourCopy = await mkdtemp(join(tmpdir(), 'tour-app-'));
await cp(new URL('../training/exercises/tour-app', import.meta.url), tourCopy, { recursive: true });
const tour = spawn(process.execPath, ['server.mjs', '--host', '127.0.0.1', '--port', '0'], { cwd: tourCopy, stdio: ['ignore', 'pipe', 'inherit'] });
try {
  const origin = await new Promise((resolve, reject) => {
    let output = '';
    tour.stdout.on('data', chunk => { output += chunk; const match = /listening on (\S+)/u.exec(output); if (match) resolve(`http://${match[1]}`); });
    tour.once('exit', code => reject(new Error(`tour app exited early (${code})`)));
  });
  const health = await fetch(`${origin}/api/health`);
  assert.equal(health.status, 200);
  const first = await fetch(`${origin}/`);
  assert.equal(first.headers.get('cache-control'), 'no-store');
  assert.match(await first.text(), /<h1>My first Vibe64 app<\/h1>/u);
  const index = join(tourCopy, 'public', 'index.html');
  await writeFile(index, (await readFile(index, 'utf8')).replace('My first Vibe64 app</h1>', 'Hello from Sam</h1>'));
  assert.match(await (await fetch(`${origin}/`)).text(), /<h1>Hello from Sam<\/h1>/u, 'An edited page shows without restarting the server.');
  assert.equal((await fetch(`${origin}/missing`)).status, 404);
  console.log('PASS: tour page is served fresh on every request; health is 200 and unknown paths are 404.');
} finally {
  tour.kill();
  await rm(tourCopy, { recursive: true, force: true });
}
