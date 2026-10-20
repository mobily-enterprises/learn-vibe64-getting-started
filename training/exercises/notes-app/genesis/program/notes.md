# Notes

## Sources

- Main: `server.mjs`
- `public/index.html`
- `public/client.js`

## Public contract

On start the server opens the SQLite file named by `NOTES_DATABASE` (default
`data/notes.sqlite`), creates `notebooks` and `notes` (each note belongs to one
notebook through `notes.notebook_id`), and seeds two notebooks and two notes only
when no notebook exists. `GET /api/notebooks` and `GET /api/notes` read rows;
`POST /api/notes` with `{ title, notebookId }` saves a note and returns its id.
An empty title or unknown notebook is refused with a readable error. The page
lists notes with their notebook and adds new ones. Restarting keeps saved notes.
