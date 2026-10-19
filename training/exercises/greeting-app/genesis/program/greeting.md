# Greeting

## Sources

- Main: `server.mjs`
- `greeting.mjs`
- `public/index.html`
- `public/client.js`

## Public contract

The button posts to `/api/greeting`. The server adds one to its in-memory press count, calls `greeting(count)` from `greeting.mjs` and sends back `{presses, message}`; the page shows the message and the count. The server reloads `greeting.mjs` whenever its saved file changes, so an edit appears on the next press without a restart. A greeting that throws, is not exported or returns no text produces a readable `error` that the page shows instead. Restart resets the count. The exercise has no dependencies.
