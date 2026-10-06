# Getting started with Vibe64 — topic preview 0.1.0

Canonical topic source for the future `mobily-enterprises/learn-vibe64-getting-started` repository. Repository metadata names the intended destination; no remote publication is implied.

This is an incomplete twelve-lesson topic. Lesson 01 is published **within the preview**. Lessons 02–12 are explicitly draft and must not be offered as complete teaching content. The separate catalogue selects this whole topic; it does not pick individual lessons. See [the outline](training/outline.md).

## Run the real orientation exercise

Requires Node.js 22 or newer. No npm dependencies, installation or database are needed.

```sh
cd training/exercises/orientation-app
node server.mjs --host 127.0.0.1 --port 8080
```

Open `http://127.0.0.1:8080`, press **Ask the server**, and read the returned message. If the server restarts while the page remains open, its button stays disabled after detecting the changed instance. In Vibe64 use **Reload preview**, then press again; standalone, reload the browser page. Stop with Ctrl+C. Vibe64 uses the exercise's authored `genesis/stack.md` setup and Outputs contracts through its native execution/Preview owners. The lesson does not launch another preview service.

The exercise's optional host channel reports formative observations, not grades. [Exercise protocol and check input](training/checks/orientation-app/README.md) describe exact correlation and restart limits. The [diagram protocol](training/visuals/client-server/README.md) is separate; motion is never evidence that the application ran.

## Author a lesson

1. Read lesson 01 as the worked example and copy the [author template](training/author-template/README.md).
2. Choose a permanent code; add the descriptor to `vibe64Training.lessons` as `draft` and add it to the outline.
3. Write outcomes and explicit assessment anchors before expanding teaching text. Declare practical producers and executable checks where needed.
4. Use topic-relative local assets and normal application Genesis contracts. Keep all required inputs in the bundle; do not reference moving remote source.
5. Run `vibe64 training validate .` from this topic root. To bundle, use `vibe64 training bundle . ../getting-started-preview-bundle` with a new output directory outside this source. See public Vibe64's `docs/training-content.md` format/CLI reference; this topic has no second validator or publishing system.
6. Trial pinned author-preview material with a real learner on desktop and phone. Try wrong answers, setup failure, interruption, text-only mode and return after leaving. Author-preview results must not become published learner progress.
7. Review and validate before marking a lesson `published`. Keep the topic `preview` while any required lesson remains draft. Publication and course locking are separately authorised repository/catalogue operations.

Local evidence belongs under ignored `.local/`. Do not commit learner records, credentials, runtime logs or generated preview output. Completing a content check proves neither the future host player nor the full teaching pilot.

## Focused content regression check

Run `node tests/content-regressions.mjs` from the topic root. It loads the exact client/controller source in a controlled page/channel harness and checks changed-instance reload recovery, stale display callbacks, cached visual result states, and semantic snapshot restoration with bounded validation. It does not start a server or prove native Preview visibility, trusted browser gestures, sandbox isolation or grading. The real standalone server/check smoke and later native pilot acceptance remain separate evidence.
