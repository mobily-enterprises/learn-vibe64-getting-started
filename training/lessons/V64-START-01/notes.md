# Teaching notes: Your first steps in Vibe64

These notes are for Colleague. The learner reads the step text; you follow the
step they are on (read it with `lesson.read`), explain it in your own words,
open real screens and point at them. Keep each reply to one small idea: invite
an action, wait, acknowledge what actually happened, then offer the next step.

## Rules for every step

- Steps pass only through their own checks: the automatic check, the learner's
  answer to a choice question, or the learner pressing **Done**. Never say a
  step is passed until the lesson shows it; your feedback never changes it.
- Never reveal or hint at which option of a choice question is correct. Explain
  the idea behind it with the learner's own observations, then let them choose.
- Demonstrating is fine, but the learner makes the real Preview press
  themselves. A press you trigger never passes the check.
- Infrastructure failures are not learner failures. Explain what you actually
  see and use the supported recovery.

## Step by step

**welcome** — Offer text or voice; neither is assessed. Give the goal first:
try the app, notice its result, then know who to ask for help or a change.

**find-your-way** — Introduce only the places needed now: project, coding
conversation, Preview, Colleague. Use the `preview` guide to point, and let the
learner find each place themselves, one at a time. On a phone, give the task
before they leave the lesson and wait for their return. The session is the
project's current working conversation; the learner need not memorise the word.

**help-or-change** — Use a small example tied to the app: “Where do I try
this?” is a help question; “Please change the greeting to Welcome” is a change
request. Common mistakes: thinking typing into Preview changes the app;
thinking talking about an idea changes it; thinking they must always open the
coding chat themselves (asking Colleague to pass it on is valid). If they pick
a wrong option, explain only the missing distinction and let them try again.

**try-the-app** — The check needs the learner's own press in the real Preview.
The greeting comes from a real server; you did not type it. If the page reports
a changed server instance, the button stays disabled: **Reload preview**, then
press again. **Restart preview** starts the app again. Use **Show run output**
to read startup errors. If the check says “not yet”, read its reason with them
and ask for a fresh press; do not run the check on their behalf to make it pass.

**what-happened** — Tell them they are looking at an explanation of what they
just did, not the app. Keep three beats tied to their action: “You pressed the
button”, “The app prepared a greeting”, “You saw its reply.” The declared play
sequence is `showOverview`, `highlightClient`, `sendRequest` (POST
/api/greeting), `showServerWork`, `sendResponse`. Offer to pause or replay. The
method and path are display details, not vocabulary to teach. If their press
failed, explain the real failure and recover before illustrating a success.
Text equivalent: “You pressed the button. The page asked the running
application for a greeting. The application replied, and you read that reply
in Preview.”

**preview-purpose** — Former rubric: the learner knows Preview is where to use
the running application and observe its behaviour. Common mistakes: “the
animation proves it works” (illustration is not action); “the agent said it
works, so we're done” (skips trying it). Hint: “Where did you press the real
button and see the result?”

**useful-request** — Former rubric: a useful request names what they tried,
what happened and what they want, plus how they would check it. Common
mistakes: “Change it” or “It's broken” (missing action and result); assuming a
setup failure is their fault. If their real press failed, use their actual
failure as the example instead of the success wording.

**meet-colleague** — Show the avatar launcher, **Talk**, the separate speaker
control (spoken replies are independent of the microphone) and **Minimize
conversation**. Minimising the avatar alone does not leave the conversation.
Minimising can leave voice active; **Stop voice chat** stops audio. On a
phone, **Show project** and **Show chat** switch between the workspace and the
coding chat; neither restores Colleague. Opening the conversation does not
start the microphone. Browser permissions and sign-in are the person's steps.

**recap** — Mention only what they actually did. Offer **Make your first
change** next.

## Recovery

- **Missing or deleted practice project:** saved step results are kept. Offer
  to end this attempt and continue the same lesson with a fresh practice
  project; do it only after the learner agrees.
- **Voice failure:** continue in text in the same conversation.
- **Animation failure:** use the text equivalent above; it is not assessed.
