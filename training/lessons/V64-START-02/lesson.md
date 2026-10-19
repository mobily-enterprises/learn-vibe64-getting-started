# V64-START-02: Make your first change

## Welcome and outcome

Suggested welcome: “Last time you pressed a button and the server sent back a greeting. This time you'll change what the server says, with your own hands. You'll edit one small file, see your change in Preview, and then ask Vibe64 to check your code. Allow about 12 minutes. This is a disposable practice project; you don't need to know how to code, and a mistake can't break anything that matters.”

Offer text, voice or both. Choosing audio is not assessed. Give the learner the small goal first: make the greeting say how many times the button has been pressed. Ask one short question at a time, wait for the learner's answer, and make room for their questions. Everyday language is enough. Silence, unsent speech and a teacher's paraphrase are not answers.

Success means the learner can open a file in **Dashboard → Files**, make a small change themselves, see its effect in Preview, use **Check my code**, and say in their own words what they changed and how they know it works. All three declared assessments are required. Watching a demonstration does not complete a practical task.

## A simple rhythm

The Main Learning conversation teaches this lesson; the general Colleague drawer stays the separate helper for using Vibe64. In this lesson the learner, not an agent, writes the change. Keep each explanation to one small idea: invite an action, wait, acknowledge what actually happened, and offer the next step.

The rhythm to teach is the one from the introduction, now done by hand: **change** one thing, **try** it in Preview, **check** it. If the learner is unsure, say “We can take this one step at a time.” Name one useful thing they have done before offering the next hint. A wrong attempt is normal; read the actual message with them and invite a small retry.

## Prepare the practice project

This lesson needs V64-START-01. Use the original lesson-start operation to prepare its own disposable practice project from the bundled greeting application, then open that project. It looks like the introduction's app, with one difference: the greeting is now written by a tiny function in `greeting.mjs`. Wait for genuine native setup and Preview readiness before asking the learner to press anything. Explain failures and retry through supported operations.

A request to begin this lesson authorises its bounded practice setup. Unrelated edits and publication require their own request.

## Try the app first

Suggested invitation: “Open Preview and press **Ask the server** two or three times. What do you see?” Wait for the actual presses. The page shows **Hello from the server!** every time, and underneath, “The server has counted 3 presses so far.”

Acknowledge what they saw: “The server is counting your presses, but the greeting never mentions it. Let's change that.”

## Meet the file

Ask the code question below before the learner edits anything: Vibe64 records the file's starting point when the question is asked, so edits made earlier cannot count.

Then guide them to the file, one move at a time. Choose **Dashboard**, then **Files**, and open `greeting.mjs`. On a phone, use the files button to show the file list. It is short:

```js
export function greeting(count) {
  return 'Hello from the server!';
}
```

Explain in plain words: “This is a function. Every time you press the button, the server runs it. `count` is the number of presses so far. Whatever comes after `return` is the text the page shows.” Do not explain more JavaScript than this task needs.

## Make the change

The learner changes the returned text so it includes the number in `count`, in words of their choosing, for example “Hello! You have asked 3 times.” They type the change themselves in the editor; it saves automatically a moment after they stop typing, and the editor shows when the save has finished.

While this question is open, never edit `greeting.mjs` yourself, even when the learner asks, and never send the finished line of code. Warn them once, kindly: “If I or another agent edits this file, your attempt no longer counts and we'd need a fresh question. I'll give you hints instead.” Good hints are concepts and pointers: “`count` already holds the number; you need to put it inside the text”, “In JavaScript you can join text and a number with `+`”, or “Look at the line that starts with `return`.” Interpreting an error message they see is also a good hint.

## See it in Preview

After the save, ask the learner to return to Preview and press **Ask the server** again. The server reloads `greeting.mjs` whenever it is saved, so no restart is needed. Their new greeting should appear, with the number matching the count line underneath. Pressing again should change the number.

If the page shows “greeting.mjs has a problem: …”, that is the server reporting a mistake in the file. Read the message with them and point to the likely line; a missing quote or bracket is common. This is useful feedback, not a failure.

## Check my code

Now ask them to choose the graduation-cap **Learning** option beside **Preview** and **Dashboard** (on a phone, the next-pane button labelled **Learning**) and press **Check my code** in the bar at the bottom of the **Courses** view. The check runs the lesson's own test on a private copy of their saved `greeting.mjs`. It tries several press counts and looks for each number in the greeting; it does not look for particular words.

Read the actual result with `practical.read`. A green **Check passed** means the code does what was asked. An amber **Not yet** gives a reason, for example that the greeting is still the starting text, or that it mentions a fixed number instead of using `count`. Help them read it, make a small fix and press **Check my code** again; only the latest check counts. A red **Could not check** says what to do first. No result only means no press was reported since the server last started: ask them to press **Check my code** again rather than issuing a new question.

## Show what changed (optional)

If the learner would like to see it, show the declared `client-server` SVG once more and replay the same journey with their greeting: `showOverview`, `sendRequest` with `method: POST` and `path: /api/greeting`, `showServerWork` with `label: greeting(count)`, then `sendResponse` with a short version of their actual greeting (at most 32 characters). Say: “The journey is the same as before. The only thing you changed is what the server writes before it replies.” Wait for each acknowledgement before describing it, and follow the introduction's Continue and pause guidance. Skip this if the presentation is unavailable; it is not assessed and never replaces the real Preview.

## Questions, practical rubrics and hints

Preserve the learner's admitted answer excerpts, grading reasons and assistance. Follow up on the missing meaning rather than demanding a long answer. After substantial help, use the fresh independent variation before recording a pass.

<a id="count-the-presses"></a>
### Make the greeting count the presses

Ask: “Change `greeting.mjs` so the greeting tells you how many times the button has been pressed. Use your own words. Then try it in Preview and press **Check my code**.” Pass requires `code` producer operation `edit-and-check` with the pinned `greeting-count` check verifying the learner's own saved `greeting.mjs`, and a short explanation in their own words of what they changed and why the greeting now changes. For example, “I put count into the message, so it says the number of presses” is enough.

The check passes any short greeting with words that includes the current press count. It does not pass the untouched starter, a fixed number such as “You asked 3 times”, a number with no words, or code that stops with an error. If other edits are detected in `greeting.mjs`, the check does not run and this question cannot pass: issue a fresh question and let the learner write the change again. A teacher-written edit, a pasted solution from the teacher or a passing check without the learner's explanation cannot pass.

First hint: “`count` already holds the number. How could you put it inside the text after `return`?” Second hint: “Text goes in quotes; you can join text and `count` with `+`.” Point to the line or interpret the actual error; do not dictate the full line. After substantial help, ask for a small independent variation once the first version passes, such as changing the words around the number, then check again.

<a id="what-preview-showed"></a>
### Say what Preview showed

Ask: “What did Preview show after your change, and what did you do to see it?” Pass when the learner describes pressing **Ask the server** in Preview after saving and seeing their own greeting with the press number, ideally noticing that the number goes up on another press. “I saved, pressed the button again and it said Hello, you asked 4 times” is enough. Use their actual observation; do not supply it.

Plausible incomplete answers: “The check passed” describes the check, not Preview; “The editor saved it” skips trying the app; “It works” leaves out what they saw. Ask only for the missing part.

First hint: “After saving, where did you press the button, and what words appeared?” Fresh variation after help: “Suppose you changed the greeting again tomorrow. How would you see whether it worked, and what would you look for?” If the real Preview failed, ask what it showed instead and how they would try again after recovery, and keep the practical incomplete until a genuine successful try.

<a id="why-check-behaviour"></a>
### Why check what the code does

Ask: “The check didn't look for exact words. It tried a few press counts and looked for each number. Why is that a good way to check your change?” Pass when the learner understands that the check tests what the code does, so any wording that does the job passes, and that trying several numbers shows the greeting really uses `count` rather than one fixed number. Everyday words are enough: “Because I could write it my own way, and it makes sure the number changes.”

Plausible incomplete answers: “So it's faster” misses the point; “It checks my spelling” confuses behaviour with exact text; “It only needs to try once” misses why a fixed number would wrongly pass.

First hint: “If the check only tried 3 presses, what greeting could pass without using `count`?” Fresh variation after help: “Someone wrote ‘You asked 3 times’. Why should a good check say Not yet?” Pass on the meaning, not a particular phrase.

## Recover and resume

- **Setup or Preview failure:** explain the actual state and use supported recovery when authorised. **Restart preview** starts the application again and resets its count; **Reload preview** refreshes the page. Use **Show run output** when needed. Infrastructure failures are not learner failures.
- **Mistake in the file:** the page or the check names the problem. Read it together and point to the line; do not fix it for them.
- **Other edits detected:** the attempt cannot pass. Issue a fresh `count-the-presses` question and let the learner make the change again.
- **Voice failure:** continue in text in the same transcript and lesson. Provisional speech is not sent evidence.
- **Interruption:** an asked, unanswered code question stays open across a restart or reload, and earlier saves in **Dashboard → Files** still count. Give a short recap and ask them to press **Check my code** again.
- **Missing or discarded exercise on return:** keep the saved checks and explain what is missing. After a direct request or accepted offer, use `lesson.end` for that saved attempt if still active, then `lesson.continue` for its exact ended pin. Read the new brief, recap genuine passed checks and guide the next remaining task.
- **Unsaved result:** say it is unsaved and retry through the progress owner. Do not claim durable completion until the write succeeds.

## Finish with a useful habit

Give a short, concrete recap of what they actually did: “You opened a real file, changed what the server says, saw it in Preview and checked it.” Name any remaining checks. All three required assessments must pass against this pinned version to finish the lesson.

Suggested takeaway: “Change one small thing, try it in Preview, then check it. Whether you write the change yourself or ask an agent, that rhythm tells you it really works.”
