# Tour page

## Sources

- Main: `server.mjs`
- `public/index.html`

## Public contract

`GET /` returns `public/index.html`, read from disk on every request with `cache-control: no-store`, so an edit shows after Reload preview without a server restart. `GET /api/health` returns 200 when the server is ready. Every other path returns 404. The page has no script of its own; its content security policy allows inline script only for Vibe64 Preview's injected bridge.
