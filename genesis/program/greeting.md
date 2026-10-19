# Editable greeting exercise

## Sources

- Main: `training/exercises/greeting-app/server.mjs`
- `training/exercises/greeting-app/greeting.mjs`
- `training/exercises/greeting-app/public/client.js`
- `training/checks/greeting-app/count.mjs`

## Public contract

The button posts to the server, which counts presses in memory and calls
`greeting(count)` from `greeting.mjs`; the page shows the returned message and the
count. The server reloads `greeting.mjs` when its saved file changes, so an edit
shows on the next press, and reports a readable error for a broken file. The
starter ignores `count`.

The `greeting-count` code check follows the public code-check contract: it reads
`{check, filesHash, files}` on stdin, imports the learner's copy relative to the
check, calls `greeting` with several counts and prints one JSON line. It verifies
that each greeting is short text with words that includes the current count, so
any wording passes and a fixed number does not. Learner output is diverted to
stderr. It needs no packages, network or files outside its copy, and a 5 second
timeout bounds endless loops. A passing check never passes the assessment alone;
the learner's explanation is graded with it.
