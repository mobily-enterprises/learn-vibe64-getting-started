# Introduction to using Vibe64 — topic preview 0.1.12

Canonical topic source for `mobily-enterprises/learn-vibe64-getting-started`. The source is published on GitHub; installing or enabling a learner release is a separate step.

Lesson 0 ("Set yourself up") is supplied by each installation, because local and hosted Vibe64 are set up very differently: local Vibe64 uses `learn-vibe64-local-setup`, and the hosted service supplies its own. This shared topic holds the installation-agnostic lessons: [**Your first steps in Vibe64**](training/lessons/V64-START-01/lesson.md), which finds the workspace, asks for help or a change, tries a real application in Preview and returns to Colleague, and [**Build with a database**](training/lessons/V64-START-02/lesson.md). See [the outline](training/outline.md).

Lesson 1 retains three short questions in chat and three practical tasks in the application. The Main Learning teacher controls the existing SVG after the learner's real Preview action to explain what happened. The SVG is an illustration; practical completion requires trusted evidence from the workspace, exercise and Colleague owners. Content validation alone does not prove host integration or learner-pilot acceptance.

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

From this topic root, validate with `vibe64 training validate .`. To bundle, use `vibe64 training bundle . ../getting-started-preview-bundle` with a new output directory outside this source. Public Vibe64's `docs/training-content.md` describes the format and CLI; this topic has no second validator or publishing system. The 0.1.9 revision corrected Lesson 1 navigation: keep the same Main Learning session selected while using **Practice project**, its session tab or **Show chat**, and **App** in Preview. Switching to Working cannot record that practical task. It preserves all assessment descriptors and full rubric sections, original exercise/check and SVG/controller bytes. The introduction keeps the explicit end/retained-pin continuation guidance. Preview 0.1.10 clarifies Lesson 0's future OpenCode Senior scope and its separate configurable Junior teacher. New Learning conversations start in Junior; Chat mode keeps Senior, Junior and Custom selectable, and Resume retains the saved choice. A separate Junior routing request also affects ordinary Junior coding work. Lesson 0 has a new exact document/rubric hash; Lesson 1 is unchanged from 0.1.9. Old passes are not automatically credited against the changed lesson version. It does not replace previously pinned 0.1.1, 0.1.2, 0.1.3, 0.1.4, 0.1.5, 0.1.6, 0.1.7, 0.1.8 or 0.1.9 content or enable a new course release. No-exercise teaching admission and safe account-status reads must be supplied by the host before offering Lesson 0. Source changes require new validation, immutable pins and human review before offering the changed content. Repository publication and catalogue/course locking are separate operations. Existing learners keep their original installed pins; continuation needs the host’s registered `lesson.continue`, retains genuine passes for that original unchanged lesson and does not replace or delete its earlier project.

Local preview 0.1.11 makes the Lesson 0 setup-to-question order explicit. The teacher waits for the person's account-control result and checks native connection, model and routing facts before preparing the safe-setup assessment. If setup is deferred, the person can explicitly request an understanding-only check; a passing answer still cannot prove account readiness. Lesson 1 now says to restore the separate Colleague helper before returning to the saved Main Learning question. Its Preview-purpose example requires observing the result, and its next-request rubric requires a way to recheck even when the real press failed. Its six assessment identities and evidence contracts are unchanged, but its document hash changes. This draft does not replace the installed 0.1.10 pin.

Preview 0.1.12 moves Lesson 0 out of this shared topic: each installation supplies its own Lesson 0 (local Vibe64 uses `learn-vibe64-local-setup`), installed first in the same course, so local and hosted setup can differ completely. It adds V64-START-02, Build with a database, with a bundled SQLite notes exercise. Lesson 1 is unchanged. Earlier pins, including their V64-START-00 attempts, are not rewritten.

Trial the pinned preview on desktop and phone, including plausible wrong answers, hints, setup failure, interruption, text-only mode and returning after leaving. Author-preview results must not become published learner progress. Keep learner records, credentials, runtime logs and generated output out of Git; local evidence belongs under ignored `.local/`.

## Focused content regression check

Run `node tests/content-regressions.mjs` from the topic root. It loads the exact client/controller source in a controlled page/channel harness and checks changed-instance reload recovery, stale display callbacks, cached visual result states, and semantic snapshot restoration with bounded validation. It does not start a server or prove native Preview visibility, trusted browser gestures, sandbox isolation or grading. The real standalone server/check smoke and later native pilot acceptance remain separate evidence.

## Local preview 0.1.11 teaching readiness

The left Main Learning conversation teaches; the right Colleague drawer remains
the general supervisor. The final `return-to-colleague` practical still means
using that actual Colleague drawer and returning to the same retained task. It is
not redefined as hiding Main. The original descriptors and assessment contracts
remain unchanged. Main’s lesson/question must be correlated with the original
Colleague observations before that practical can pass.

This source is a content candidate. Do not enable it as a completed Main course
until the host composes the actual workspace practical observer, response check
and explanation admission, Colleague leave/restore observations, and piloted
player with Main’s exact delivered questions and accepted learner answers. The
existing no-exercise Main quiz integration alone cannot deliver the introduction.
Lesson0 also requires a real human account/key/default trial, truthful permitted
model checks and desktop/phone acceptance. Validation and the controlled content
harness establish neither native delivery nor beginner completion.

Use a new immutable topic/course pin for this source after review; retain existing
installed releases and learner progress. This source publication does not install
or enable a learner release.
