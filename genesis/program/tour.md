# Tour page

## Sources

- Main: `training/exercises/tour-app/server.mjs`
- `training/exercises/tour-app/public/index.html`

## Public contract

The practice project of V64-START-00 Introduction to Vibe64: one static page
(heading **My first Vibe64 app**, a sentence and a blue box) that the learner
asks the coding chat to change. `GET /` reads `public/index.html` from disk on
every request with `cache-control: no-store`, so an edit shows after Reload
preview without restarting the server; `GET /api/health` returns 200 for the
Stack readiness probe; anything else is 404. The page has no script of its own
and sends the same content security policy as the orientation app, which
allows inline script only for Vibe64 Preview's injected bridge. The lesson has
no automatic check on this exercise.

Its `.gitignore` excludes the agent guidance directories Vibe64 writes when
the practice project opens (`.agents/`, `.claude/`, `.codex/`, `.opencode/`),
so Current changes and Save show only the learner's own change.
