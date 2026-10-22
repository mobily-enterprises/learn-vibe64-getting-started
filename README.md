# Introduction to using Vibe64 — topic 0.4.0 (Learning v2 draft)

Canonical topic source for `mobily-enterprises/learn-vibe64-getting-started`.
Publishing this source does not install or enable a learner release; course
pins are prepared separately in the official catalogue.

This release uses lesson format v2 (`lesson.json` `schemaVersion: 2`). See
public Vibe64's `docs/training-content.md` for the format and the
`vibe64 training` CLI, and its `docs/templates/learn-topic/` template for new
topics. [The outline](training/outline.md) lists the four lessons.

## How a v2 lesson is laid out

```
training/lessons/V64-START-01/
  lesson.json      descriptor: exercise, checks, visuals and ordered steps
  notes.md         “Good to know” background for the learner (Lesson notes)
  steps/*.md       learner-facing text, one file per step
```

Each step has a plain, second-person body that a learner can follow without AI,
an optional `visual` play sequence using the visual's declared commands, an
optional `guide` (a declared Vibe64 place that **Show me** points at or opens)
or, instead of a guide, a closing `beats` block that the lesson step bar plays
one line at a time (V64-START-00 uses beats on every step), and a `check`:

- `auto` runs a declared check script. A pass needs learner-origin evidence:
  the learner's own Preview press (V64-START-01 `orientation-response`) or
  code the learner wrote after entering the step (V64-START-02
  `greeting-count`, file `greeting.mjs`).
- `choice` replaces former answer assessments that have a right answer. The
  correct options are compared on the server and never shown to Colleague.
- `self` is the learner's own **Done** for reflective or human-only steps.
- `review` asks the learner's own AI to judge their practice project changes
  against the rubric in the step's `check review:` beat (V64-START-00
  `see-the-change`, `evidence: ["changes"]`). It runs only when the learner
  presses **Check my work**.
- `none` steps are reading steps and are never required.

`notes.md` is shown to the learner as **Lesson notes**: plain background,
tips and recovery, written in the second person. It never contains answers to
choice questions or instructions for judging the learner. Colleague teaches
from the same step text and notes, opens real screens, uses the guides and
replays visuals. It never grades; a `review` check is the lesson's own
check, run on the learner's request, not Colleague's.

## Run the practice applications

Each lesson has its own practice app. Requires Node.js 22 or newer (the notes
app uses the built-in `node:sqlite`).
No npm dependencies are needed.

```sh
cd training/exercises/tour-app   # or orientation-app, greeting-app, notes-app
node server.mjs --host 127.0.0.1 --port 8080
```

Open `http://127.0.0.1:8080`. In Vibe64 each exercise runs through its own
`genesis/stack.md` setup and Outputs contracts. The orientation app's optional
host channel and check input are described in
[its check README](training/checks/orientation-app/README.md); the
[SVG protocol](training/visuals/client-server/README.md) is separate, and motion
is never evidence that the application ran.

## Validate and check

From public Vibe64 (with v2 support), run
`node bin/run.js training validate <this topic>`. Then run
`node tests/content-regressions.mjs` from this topic root: it exercises the
tour page server, the orientation client, the visual controller and the v2 step inventory in a
controlled harness. It does not prove native Preview, browser gestures or
learner acceptance; trial the lessons on desktop and phone before release.

Earlier releases (0.1.x, schema version 1) keep their installed pins and
learner history; this source does not rewrite them.
