# Subsystems

## `topic` Teaching content

Owns the topic outline, lesson step text and teaching notes. Does not own learner progress, access, checks' execution or grading.

### Source

- Directory `.`

### Program

- `genesis/program/topic.md`

### Data owned

- Nothing.

### Data used

- Nothing.

## `tour` Tour page

Owns the static practice page of the introduction lesson, read fresh on every request so a coding-chat edit shows after Reload preview.

### Source

- Directory `training/exercises/tour-app`

### Program

- `genesis/program/tour.md`

### Data owned

- Nothing.

### Data used

- Nothing.

## `orientation` Runnable orientation

Owns the browser/server example, finite response check and optional host observation protocol.

### Source

- Directory `training/exercises/orientation-app`

### Program

- `genesis/program/orientation.md`

### Data owned

- Nothing.

### Data used

- Nothing.

## `greeting` Editable greeting exercise

Owns the greeting exercise whose one function the learner edits, and its finite code check. Does not own learner progress or authorship records.

### Source

- Directory `training/exercises/greeting-app`

### Program

- `genesis/program/greeting.md`

### Data owned

- Nothing.

### Data used

- Nothing.

## `notes` Notes database exercise

Owns the notes exercise whose notebooks and notes live in a Stack-declared SQLite database. Does not own learner progress or the editor's database views.

### Source

- Directory `training/exercises/notes-app`

### Program

- `genesis/program/notes.md`

### Data owned

- Nothing.

### Data used

- Nothing.

## `visual` Client/server explanation

Owns static SVG, declared finite-state commands and their sandbox controller. Has no editor capabilities.

### Source

- Directory `training/visuals/client-server`

### Program

- `genesis/program/visual.md`

### Data owned

- Nothing.

### Data used

- Nothing.
