# Lesson author template

Copy `lesson.json` and `lesson.md` into a new lesson directory, replace `V64-AUTHOR-01` with a permanent code, then add a draft entry to the root topic manifest and outline. The template is outside the published lesson list. Keep assessment IDs and explicit HTML anchors identical. All paths resolve relative to their owning descriptor.

An answer uses the learner's admitted message and a Markdown rubric. A practical assessment must declare `evidence.producer` (`workspace`, `colleague` or `exercise`) and `operation`. A server check also declares a check ID/file; no model assertion or diagram event can replace its result. Rubrics must name passing evidence, incomplete evidence, hints, assistance and any approved alternative.

Use `exercise.reuse: "attempt"` for an independent exercise. For shared work use one `sequenceId`, `sequenceMode: "create"` once, then `"continue"`, always resolving to the same source directory. Do not make exercise code branch by lesson. Publish only after real controls, permissions, accessibility and recovery have been reviewed.

Declare every auxiliary local module, stylesheet or protocol document in the owning check/visual `assets` array. Built-in platform APIs need no asset declaration. Bundles must contain every input; do not fetch hidden dependencies.
