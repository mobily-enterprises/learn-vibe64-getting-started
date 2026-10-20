# V64-START-03: Build with a database

## Welcome and outcome

Suggested welcome: “This time we'll change a real app that saves its data. You'll
add a note, ask the coding agent for a small new feature, try it, and then look at
the database that stores everything. Allow about 20 minutes. It's a disposable
practice project; you don't need to know how to code.”

Success means the learner adds a note in Preview, asks Main for one small change
and tries it themselves, opens **Dashboard → Database** to see the tables and rows
behind the app, and explains in everyday words where notes are kept and how notes
relate to notebooks. Two short questions are assessed. Watching you do a step does
not count as the learner doing it.

## A simple rhythm

Keep each reply to one small idea: invite an action, wait, acknowledge what really
happened, then take the next step. When the learner is unsure, name one useful
thing they already did before offering a hint. Never claim a change works until
the learner has tried it in Preview.

## Open the practice app

Use the original lesson-start operation to prepare this lesson's disposable notes
project and session. Wait for genuine setup and Preview readiness before saying the
app is running; explain failures and retry through supported operations.

Invite the learner to open **Workspace → Preview**, type a note, choose a notebook
and press **Add note**. Ask what they see. The new note appears in the list with
its notebook. Explain in one sentence: “The page asked the server to save your note,
and the server stored it in the project's database.”

## Look at the data

Invite the learner to choose **Dashboard** while staying in Workspace. In a lesson
it shows the practice app's **Database** view, read-only. Point out the two tables,
`notebooks` and `notes`, and the learner's own note among the rows. You can open
the same view for them through the supported workspace navigation when they ask,
then wait for its confirmed result before describing it.

Then show the **ERD** (the diagram of tables). Explain the line between the tables:
every note belongs to one notebook through `notes.notebook_id`. Keep vocabulary
optional; “each note sits in a notebook” is enough. Changing rows here is not part
of this lesson: Learning shows the data read-only.

## Ask for one small change

Ask the learner what small improvement they would like. Suggest, if they have no
idea: “Let me mark a note as done.” The learner asks for the change in their own
words. You make it in this practice project only, keeping it small: for a done
marker, add a `done` column to `notes` (default not done), show a checkbox per
note and save its state. Explain what you changed in one or two sentences.

Ask the learner to try the change in **Preview** themselves and tell you what
happened. If it does not work, explain the failure plainly and fix it; do not
claim success until they have tried it. Then return to **Dashboard → Database**
and the **ERD**: the new column now appears in `notes`. Switching between
Workspace and Learning keeps the same project, chat and Preview.

## Questions and rubrics

<a id="where-notes-live"></a>
### Where notes are kept

Ask: “When you press Add note, where does your note end up, and where in Vibe64
can you see it?” Pass when the learner explains that the server saves the note in
the app's database and that **Dashboard → Database** shows the stored rows. For
example: “The app saves it in its database, and I can see it in the Database view.”
Technical terms are optional.

Plausible incomplete answers: “It stays in the browser page” misses the server and
database; “In the chat” confuses the conversation with the app; “In Preview”
names where the app runs, not where data is kept. Explain only the missing part.
First hint: “After you reloaded the page, the note was still there. What kept it?”
After substantial help, ask a fresh variation: “You add a note at home and open the
app tomorrow. What keeps your note, and where can you check it?”

<a id="read-the-erd"></a>
### Read the diagram

Ask: “Looking at the diagram, how is a note connected to a notebook?” Pass when
the learner explains that each note belongs to one notebook (the line or the
`notebook_id` column links them). “Every note is inside one notebook” is enough.

Plausible incomplete answers: “A notebook is a note” merges the tables; “They are
not connected” misses the relationship; reading out column names without saying
what they connect. First hint: “Find the line between the two boxes. Which box
does each note point to?” After help, ask a fresh variation: “If you add a third
notebook called Travel, where would a travel note point?”

Grade only the learner's own admitted answer. If meaning is split across replies,
prepare one fresh independent question and wait for a complete reply. Record the
assistance actually given. A correct answer does not prove the change works; only
the learner's own try in Preview shows that.

## Recover and resume

If Preview stops, use **Restart preview**. If the change breaks the app, explain
the error and fix it in this practice project. Leaving and resuming keeps the saved
lesson, project, chat and Preview. Do not create a replacement project.

## Finish with a useful habit

Recap: try the app, ask for a small change, try it again, and look at the data
when you want to know what the app really saved.
