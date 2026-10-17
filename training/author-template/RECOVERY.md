# Author recovery: exercise contracts

Use this when a bundled exercise cannot prepare because its Genesis contracts are
incomplete, for example a missing `## Connected development` section. It covers
content-only contract repair; it does not cover lesson, assessment or app changes.

## Old pins are immutable

Installed versions and learner pins never change. A repair here lands only in a
later version; learners on an older pin keep the content they installed, including
its defects. Do not edit, re-tag or replace an installed version to "fix" it.

## Same-session recovery

1. Stay in the authoring session and branch that found the failure.
2. Read the reported diagnostic and change only the named contract files:
   - root and exercise `genesis/stack.md`: `## Connected development` with
     `` - Default package type: `npm` ``
   - exercise `genesis/subsystems.md`: `### Source` with `` - Directory `.` ``
   - exercise Program: mark the entry file with `Main:`
3. Keep root subsystem Source declarations and Program anchors unchanged.
4. Leave lesson text, assessment IDs and rubrics, exercise/visual source, the
   package version and catalogue/course locks untouched.
5. Run `genesis check` from the repository root. Under the managed wrapper,
   `genesis` always targets the repository root, even when run inside the
   exercise directory, so it does not validate the exercise on its own. The real
   end-to-end confirmation is the platform's supported exercise re-preparation.
   Stop after two failed setup retries and report the diagnostic instead of
   looping.

## Release is a separate reviewed step

Passing checks does not publish anything. Saving, pushing, opening a pull request,
bumping the version, changing pins and installing or trialling the course each
happen later, after review, as their own explicit step.
