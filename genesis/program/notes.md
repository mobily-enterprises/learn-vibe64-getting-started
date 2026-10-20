# Notes database exercise

## Sources

- Main: `training/exercises/notes-app/server.mjs`
- `training/exercises/notes-app/public/client.js`
- `training/exercises/notes-app/genesis/stack.md`

## Public contract

The notes exercise stores notebooks and notes in the SQLite file its Stack
declares as the `database` resource (`NOTES_DATABASE`, default
`data/notes.sqlite`). Each note belongs to one notebook through
`notes.notebook_id`. The page lists notes and adds new ones through
`POST /api/notes`. It needs no packages beyond Node's built-in `node:sqlite`.
