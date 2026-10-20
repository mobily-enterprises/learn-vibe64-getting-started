# Good to know: Build with a database

These notes add background to the steps. You can read them at any time.

## Words you'll meet

You don't need to learn these words; describing the idea in your own way is
just as good.

- A **database** is where an application keeps data safely, so it's still
  there after a reload or a restart.
- A **table** holds one kind of thing, like notes or notebooks. Each **row** is
  one item and each **column** is one piece of information about it.
- An **ERD** (entity relationship diagram) is a picture of the tables and the
  lines that connect them.

## What's in the app at the start

The app starts with two notebooks, **Home** and **Work**, and two example
notes. Everything you add is saved in the same database.

## Asking for a change

- Keep it small: one feature you can try in a minute.
- Say what you'd like and how you'll know it works. Colleague can pass your
  request to the coding agent in this practice project.
- An agent saying “done” isn't the end: try it yourself in **Preview**. If it
  doesn't work, say what you tried, what happened and what you expected.

## If something goes wrong

- **Restart preview** starts the app again; your notes survive because they
  live in the database. Press it after the coding agent changes `server.mjs`,
  so Preview runs the new code.
- If **Database** doesn't show a new table or column yet, press **Refresh
  schema**. **Show run output** shows what the app printed while
  starting.
- If a change breaks the app, tell the coding agent what you see and ask it to
  fix it in this practice project.
- Problems with the app or the computer it runs on are never your fault.
- If your practice project goes missing, your step results are kept. You can
  end this attempt and start the lesson again with a fresh practice project.
