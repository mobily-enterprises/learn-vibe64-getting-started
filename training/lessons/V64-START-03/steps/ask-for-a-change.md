Now ask for one small new feature. If you don't have an idea of your own, try:
“Let me mark a note as done.”

1. Ask in your own words. You can write to the coding agent in the project's
   coding conversation, or ask Colleague to pass the request on. A useful
   request says what you'd like and how you'll know it works, for example:
   “Please add a checkbox to each note so I can mark it as done. It should
   stay ticked after I reload the page.”
2. Wait until the agent says it has finished.
3. The agent changed the app's server code (`server.mjs`), and Preview is
   still running the old copy. Restart the preview so it runs the new code.
   Use the control labelled **Restart preview**, not **Reload preview**:
   Reload only reloads the page and keeps the old server running. Several
   Preview buttons share the same circular-arrow icon, so go by the label or
   tooltip. You may see a warning icon in the Preview toolbar saying
   **Preview may be stale** (“Server-side app files changed… Restart preview”);
   open it and press **Restart preview** there. Otherwise look for
   **Restart preview** in the Preview toolbar or in the run output panel. If
   you can't find it, ask Colleague to restart the preview for you.
4. Try it yourself in **Preview**: tick a note, then reload the page. Is it
   still ticked?

If it doesn't work, tell the agent what you tried, what happened and what you
expected. That's the habit from your first lesson.

Press **Done** when you've tried the new feature yourself in Preview.
