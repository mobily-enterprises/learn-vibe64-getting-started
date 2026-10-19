// Code check contract: read {check, filesHash, files} on stdin, call the learner's
// greeting() from their copy of the exercise and print exactly one JSON line.
// Exit 0 with outcome "verified", or exit 1 with outcome "incomplete" and a reason.
// It checks behaviour, not exact words: any greeting that tells the learner how
// many times the button was pressed passes.
import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf8'));
const write = process.stdout.write.bind(process.stdout);
// Learner code may print; keep stdout for the single result line.
process.stdout.write = (...args) => process.stderr.write(...args);
console.log = console.info = (...args) => console.error(...args);
const report = (outcome, reason) => {
  write(`${JSON.stringify({ check: input.check, filesHash: input.filesHash, outcome, ...(reason ? { reason: reason.slice(0, 256) } : {}) })}\n`);
  process.exitCode = outcome === 'verified' ? 0 : 1;
};
const mentions = (text, number) => new RegExp(`(^|[^0-9])${number}([^0-9]|$)`, 'u').test(text);

async function verify() {
  let module;
  try {
    module = await import(new URL('../../exercises/greeting-app/greeting.mjs', import.meta.url));
  } catch (error) {
    return `greeting.mjs has a mistake JavaScript cannot read: ${String(error?.message || error).split('\n')[0]}`;
  }
  if (typeof module.greeting !== 'function') return 'greeting.mjs must still export a function called greeting.';
  for (const count of [1, 2, 7, 42]) {
    let message;
    try { message = await module.greeting(count); } catch (error) {
      return `greeting(${count}) stopped with an error: ${String(error?.message || error).split('\n')[0]}`;
    }
    if (typeof message !== 'string' || !message.trim()) return `greeting(${count}) must give back some text for the page to show.`;
    if (!/\p{L}/u.test(message)) return `greeting(${count}) gave back only "${message.slice(0, 40)}". Add some words around the number.`;
    if (message.length > 200) return 'The greeting is longer than 200 characters. Keep it short enough to read at a glance.';
    if (!mentions(message, count)) {
      if (message === 'Hello from the server!') return 'The greeting is still the starting text. Use count so it says how many times the button was pressed.';
      if (/\bcount\b/u.test(message)) return 'The greeting shows the word "count" instead of the number. Put count outside the quotes and join it to the text.';
      return `After ${count} press${count === 1 ? '' : 'es'} the greeting was "${message.slice(0, 60)}", which does not mention ${count}. Use count rather than a fixed number.`;
    }
  }
  return null;
}

const reason = await verify();
reason ? report('incomplete', reason) : report('verified');
