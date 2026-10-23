# Teaching content

## Sources

- `package.json`
- Main: `training/outline.md`
- `training/lessons/V64-WELCOME/lesson.json`
- `training/lessons/V64-WELCOME/notes.md`
- `training/lessons/V64-START-00/lesson.json`
- `training/lessons/V64-START-00/notes.md`
- `training/lessons/V64-START-01/lesson.json`
- `training/lessons/V64-START-01/notes.md`
- `training/lessons/V64-START-02/lesson.json`
- `training/lessons/V64-START-02/notes.md`
- `training/lessons/V64-START-03/lesson.json`
- `training/lessons/V64-START-03/notes.md`
- `tests/content-regressions.mjs`

## Public contract

Topic 0.5.0 lists five published, required lessons in order: V64-WELCOME
Welcome to Vibe64, V64-START-00 Introduction to the editor, V64-START-01 Your
first steps in Vibe64, V64-START-02 Make your first change (requires 01) and
V64-START-03 Build with a database (requires 01). Each descriptor uses lesson
format v3 (format v2 plus its `stage`). V64-WELCOME is `stage: "studio"`, has no
exercise and is the course's orientation (the lesson Take the tour starts);
its `your-ai` step is a `fact` check of `ai-ready`, and its hosted steps use
the Online places the topic declares in `places` (`manage-projects`,
`manage-accounts`, `manage-assistant`, `manage-users`, `manage-studio-health`,
`manage-launcher`), so they are left out where those places are not
registered or not open to the learner. The other lessons are `stage:
"project"`, taught in their practice project. Each has learner-facing `notes` (shown as Lesson
notes; never answers or judging instructions) and ordered `steps` whose `body`
files under `steps/` are learner-facing Markdown.

Steps declare an optional `visual` play sequence of the client-server visual's
declared commands, an optional `guide` to a declared Vibe64 place and a
`check`. `auto` checks name a declared check script: `orientation-response`
needs the learner's own Preview press, and the `greeting-count` code check
covers `greeting.mjs` written by the learner after entering the step. `choice`
checks replace former answer assessments that have a right answer; their
`answer` indexes are compared on the server and never shown to Colleague or the
browser. `self` checks are the learner's **Done**. `none` steps are optional
reading. There are no rubrics and no AI grading.

Lesson 0 tours the editor on the static tour page; its coding-chat, check and
Save steps are optional self checks so it can be finished without a connected
AI, and it has no automatic check. Every lesson prepares a disposable practice
project (`reuse: "attempt"`). Lesson 3 declares its only
data-changing route, `POST /api/notes`.

New topics start from public Vibe64's `docs/templates/learn-topic/`; this
repository no longer carries its own author template. Earlier 0.1.x releases
(lesson format v1) keep their installed pins and learner history.
