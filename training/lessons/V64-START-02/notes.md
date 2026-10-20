# Good to know: Make your first change

These notes add background to the steps. You can read them at any time.

## This change is yours

In this lesson you write the change yourself. When you open **Make the
greeting count**, Vibe64 notes how `greeting.mjs` looks, so it can tell that
the change afterwards is your own work. If you already changed the file in an
earlier step, that's fine, but make your change after opening that step.

If an agent (Colleague or the coding agent) edits `greeting.mjs` while you're
on that step, the check can't count it as yours and you'll need to start the
step again. Colleague knows this: it will give you hints and point at the
right line, but it won't write the line for you.

## Words you'll meet

- A **function** is a small piece of code with a name. The server runs
  `greeting` every time you press the button.
- `count` is a value the function receives: the number of presses so far.
- `return` gives back the result: here, the text the page shows.
- Text goes inside quotes. A number like `count` stays outside them. `+`
  joins pieces together.

## How the check works

**Check now** runs your `greeting` function and tells you whether it does
what the step asks. The step's text explains what it looks for.

If the step stays **Not yet passed**, read the reason it gives, fix your line
and press **Check now** again. Only your latest check counts.

## If something goes wrong

- **“greeting.mjs has a problem”** means the server found a mistake in the
  file. A missing quote or bracket is common. Look at your line, fix it and
  try again.
- **Restart preview** starts the app again and resets its press count.
  **Reload preview** refreshes the page. **Show run output** shows what the
  app printed while starting.
- Problems with the app or the computer it runs on are never your fault.
- If your practice project goes missing, your step results are kept. You can
  end this attempt and start the lesson again with a fresh practice project.
