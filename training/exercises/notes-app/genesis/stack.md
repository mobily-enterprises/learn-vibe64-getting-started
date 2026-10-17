# Stack

## Stack packages

- `genesis-stack`

## Components

- `nodejs`
- `sqlite`

## Resources

```json genesis-resource
{
  "id": "database",
  "kind": "sqlite",
  "environmentAlternatives": [
    {
      "bindings": {
        "database": "NOTES_DATABASE"
      },
      "preferred": true
    }
  ]
}
```

## Environment defaults

- Default `NOTES_DATABASE`: `data/notes.sqlite`

## Verification

- Verify `JavaScript syntax`: `npm` `run` `check`

## Workspace setup

- Prepare `Check server syntax` with `nodejs`: `node` `--check` `server.mjs`
- Prepare `Check browser syntax` with `nodejs`: `node` `--check` `public/client.js`

## Connected development

- Default package type: `npm`

## Outputs

### Target `app`: Notes application

- Default.
- Mode: `interactive`
- Workdir: `.`
- Runtimes: `nodejs`
- Run `Start the real server`: `node` `server.mjs` `--host` `{host}` `--port` `{port}`

#### Presentation

- Kind: `web`
- Preferred port: `8080`
- URL path: `/`
- Ready when: `GET` `/api/health` returns `200`
