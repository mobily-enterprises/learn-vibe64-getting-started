# Introduction to using Vibe64 — topic preview 0.1.6

Canonical topic source for `mobily-enterprises/learn-vibe64-getting-started`. Repository metadata names the destination; no remote publication is implied.

This preview starts with [**Connect your AI**](training/lessons/V64-START-00/lesson.md): human Z.AI registration and private key entry, verified regular-API access, and the requested future Main GLM-4.7 default. Full GLM-4.7 is paid; the distinct GLM-4.7-Flash option is explained separately. It is followed by the unchanged [**Your first steps in Vibe64**](training/lessons/V64-START-01/lesson.md). In about 10–15 minutes, that introduction finds the workspace, asks for help or a change, tries a real application in Preview, and returns to Colleague with an observation. See [the outline](training/outline.md).

Lesson 0 has one safe-setup answer assessment and no exercise. Lesson 1 retains three short questions in chat and three practical tasks in the application. Colleague controls the existing SVG after the learner's real Preview action to explain what happened. The SVG is an illustration; practical completion requires trusted evidence from the workspace, exercise and Colleague owners. Content validation alone does not prove host integration or learner-pilot acceptance.

## Run the real practice application

Requires Node.js 22 or newer. No npm dependencies, installation or database are needed.

```sh
cd training/exercises/orientation-app
node server.mjs --host 127.0.0.1 --port 8080
```

Open `http://127.0.0.1:8080`, press **Ask the server**, and read the returned message. If the server restarts while the page remains open, its button stays disabled after detecting the changed instance. In Vibe64 use **Reload preview**, then press again; standalone, reload the browser page. Stop with Ctrl+C. Vibe64 uses the exercise's authored `genesis/stack.md` setup and Outputs contracts through its native execution/Preview owners. The lesson does not launch another preview service.

The exercise's optional host channel reports formative observations, not grades. [Exercise protocol and check input](training/checks/orientation-app/README.md) describe exact correlation and restart limits. The [SVG protocol](training/visuals/client-server/README.md) is separate; motion is never evidence that the application ran.

## Review and adapt the content

Read lesson 01 as the worked example. Its three quiz IDs assess using Vibe64: `help-or-change`, `preview-purpose` and `next-step`. Earlier networking-quiz passes do not count as passes for these questions. The three practical IDs and their evidence contracts remain unchanged.

Use the [lesson author template](training/author-template/README.md) when authoring separate future material. This preview has no planned continuation or checklist exercise sequence. Declare all local assets, assessment anchors, practical producers and executable checks; use normal application Genesis contracts.

From this topic root, validate with `vibe64 training validate .`. To bundle, use `vibe64 training bundle . ../getting-started-preview-bundle` with a new output directory outside this source. Public Vibe64's `docs/training-content.md` describes the format and CLI; this topic has no second validator or publishing system. This 0.1.6 source revision adds prerequisite onboarding before the unchanged introduction. It does not replace previously pinned 0.1.1, 0.1.2, 0.1.3, 0.1.4 or 0.1.5 content or enable a new course release. No-exercise teaching admission and safe account-status reads must be supplied by the host before offering Lesson 0. Source changes require new validation, immutable pins and human review before offering the changed content. Repository publication and catalogue/course locking are separate operations.

Trial the pinned preview on desktop and phone, including plausible wrong answers, hints, setup failure, interruption, text-only mode and returning after leaving. Author-preview results must not become published learner progress. Keep learner records, credentials, runtime logs and generated output out of Git; local evidence belongs under ignored `.local/`.

## Focused content regression check

Run `node tests/content-regressions.mjs` from the topic root. It loads the exact client/controller source in a controlled page/channel harness and checks changed-instance reload recovery, stale display callbacks, cached visual result states, and semantic snapshot restoration with bounded validation. It does not start a server or prove native Preview visibility, trusted browser gestures, sandbox isolation or grading. The real standalone server/check smoke and later native pilot acceptance remain separate evidence.
