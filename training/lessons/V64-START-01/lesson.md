# V64-START-01: Your first steps in Vibe64

## Welcome and outcome

Suggested welcome: “Let's try a little application together. You'll press a button, see its greeting, and learn how to ask for help or a change. Along the way, we'll find the few parts of Vibe64 you need. Allow about 10–15 minutes. This is a disposable practice project; you don't need to know how to code.”

Offer text, voice or both. Choosing audio is not assessed. Give the learner the small goal first: try the app, notice its result, then tell an agent what they would like next. Ask one short question at a time, wait for the learner's answer, and make room for their questions. Everyday language is enough; do not require technical vocabulary. Silence, unsent speech and a teacher's paraphrase are not answers.

Success means the learner can find the project, coding conversation and Preview; distinguish help from an application change; press the real application's button and describe the result; make a useful follow-up request; and return to the same general Colleague helper. All six declared assessments are required. Watching a demonstration does not complete a practical task.

## A simple rhythm

The Main Learning conversation teaches this lesson. The general Colleague drawer
helps you operate Vibe64 and can coordinate changes to a project. Introduce this
difference in one sentence, then begin the real task rather than explaining every
control at once. Keep each spoken explanation to one small idea: invite an action,
wait, acknowledge what actually happened, and ask the next short question.

If the learner is unsure, say “We can take this one step at a time.” Name one
useful thing they have done before offering the next hint. For a wrong answer,
explain the missing distinction with their own observation, then invite a small
independent retry. Do not praise an unconfirmed action as completed or make them
repeat a correct answer in technical words.

## Prepare the practice project

Confirm the learner can use the Main Learning teacher and general Colleague helper and has permission for approved training projects. Sign in when this installation requires it. No GitHub account, project-owner privilege or previous coding knowledge is required. Use the installed, pinned preview topic and its bundled orientation application.

Use the original lesson-start operation to prepare the disposable project and session, then open that actual project. The Main Learning teacher guides this saved lesson; Colleague remains the separate general supervisor. Wait for genuine native setup and Preview readiness. Setup and launch use the exercise's Genesis contracts, with no separate lesson launcher. Explain failures and retry through supported operations; a drawing cannot replace a failed application.

Explain that learning progress is retained outside the practice project. A request to begin this introduction authorises its bounded practice setup. A question about course coverage alone does not authorise project creation. Unrelated edits and publication require their own request.

## Find your way around

Introduce only the locations needed now. “The **project** holds our application's work. Its **coding conversation** is where a coding agent works on changes. **Colleague** helps you use Vibe64, explains things and can coordinate a coding agent for you. **Preview** is where you try the running application.” A session keeps the project's current working conversation; the learner need not memorise this term.

Keep the Main Learning conversation selected and point out its actual controls. **Practice project** selects this saved lesson's practice project; its session tab or **Show chat** reveals the same Main conversation. **App** in Preview shows the running practice application. On desktop, **Collapse chat** makes more room for the project. On mobile, **Show project** returns from Main chat to the workspace and **Show chat** brings Main back, not Colleague; **Show preview controls** expands the Preview toolbar. If output settings are needed, use **Preview options** and **Run**. The teacher checks current state and waits for readiness before claiming the app is running.

For Colleague itself, its visible avatar launcher opens the conversation. Type in the shared message box, or use **Talk** to speak in that same chat. Opening the conversation does not start the microphone. The separate speaker control chooses spoken replies independently: you can speak and read silently, or type and hear replies. **Minimize conversation** hides the conversation; the visible Colleague launcher restores it. This is different from minimising the avatar alone, which does not leave the conversation. Use the actual visible controls for this device and host. Browser permissions and sign-in still require the person’s interaction.

For these practical tasks, stay in Learning with the same Main session and pending question while using **Practice project**, the session tab or **Show chat**, and **App** in Preview. Switching to Working cannot record this lesson's practical steps. Show or hide the chat as needed without changing the selected Learning session. Other coding work can use Working separately after this practical task.

After a brief demonstration, let the learner find each location themselves, one at a time. Say why each move helps: the coding conversation is where changes happen; Preview is where they will press the button. Avoid making every navigation decision for them.

Keep one issued `workspace-navigation` question for the whole project → coding conversation → Preview challenge. Coach one move at a time without preparing a replacement question between moves; all three observations must belong to that same challenge. Selecting the practice project that is already current is enough for the first move. On a phone, give the task before the learner opens the workspace, then wait for their return to this Learning conversation. Keep the same question while the chat is hidden; do not send more questions ahead of them.

## Who can help?

“If you're unsure what to do, ask Colleague. If you want the application changed, you can ask Colleague to pass on the request or ask the coding agent directly. The coding agent implements the change. Then you try the result in Preview.”

Use a small example tied to the upcoming task: “Where do I try this?” is a help question. “Please change the greeting to Welcome” is a change request. Discussing an idea does not itself change the application. This introduction does not require editing the greeting; save any proposed extra change for a separate request.

Ask the `help-or-change` question below before continuing. Support a partial answer, then use a fresh variation if substantial help was needed.

## Try one real task

Suggested invitation: “Open Preview and press **Ask the server**. What message appears?” Wait for the learner's actual press. The page briefly shows “Asking the server…” and then **Hello from the server!**, with a request reference. Ask them to describe what happened in their own words.

Acknowledge what they actually observed before explaining it: “You tried the app and saw its greeting.” Do not require them to read or remember the request reference. One useful explanation is: “The button in Preview asked the application's running program for a greeting, and the page displayed its reply.” Keep this tied to the result they saw. The greeting comes from a real server; the teacher did not type it into Preview.

A second press makes a fresh request. If the teacher demonstrates, the learner must then make a fresh independent press. If the page reports a changed server instance, **Ask the server** stays disabled: use **Reload preview**, then press again. **Restart preview** starts the application again; **Reload preview** refreshes its page. Explain actual startup errors and use **Show run output** when needed. Infrastructure failures are not learner failures.

## Show what just happened

After the learner's successful real Preview action, show the declared `client-server` SVG when its supported presentation is available. Tell them that they are now looking at an explanation of the app they just tried, rather than the app itself. Use the host's actual controls; do not invent a presentation switch or claim the SVG opened without acknowledgement. Suggested explanation: “This picture shows the action you just tried. Your page asked for the greeting, the application prepared it, and the reply came back to the page.” If the real action failed, explain its observed failure and recover before illustrating a successful reply.

Keep the illustration to three short beats linked to their action: “You pressed the button”; “The practice app prepared a greeting”; “You saw its reply.” The Main Learning teacher controls it as part of the conversation: use `showOverview`, optionally `highlightClient`, then `sendRequest` with `method: POST` and `path: /api/greeting`; use `showServerWork` with `label: Prepare a greeting`, then `sendResponse` with `label: Hello from the server!`. Pause between beats if the learner has a question. Say “Ask me to pause the diagram.” Use the declared `pause` command and verify its receipt; do not suggest a player Pause button. **Minimise presentation** hides and pauses the diagram through the host checkpoint flow. Return to the same Main Learning conversation after viewing the diagram. Colleague’s avatar launcher opens the separate general helper. Reset and replay when they ask. Keep labels short and display-only. The method/path are display details, not vocabulary to teach or assess. No port explanation is needed for this introduction.

Wait for each command's completed acknowledgement before describing its result. Acceptance alone does not prove completion; report a failure honestly. Reduced motion uses the same labelled states without travelling animation. Text equivalent: “You pressed the button. The page asked the running application for a greeting. The application replied, and you read that reply in Preview.” If the SVG fails, use this text and retry the player; conceptual questions can continue, but controlled-animation pilot acceptance remains unproved.

Before issuing a diagram cue, explain the next step in the conversation: with sound off, press **Continue**, watch the short transition finish, then return to the Main Learning teacher and say “ready” or ask a question. Finish the diagram before hiding it to return to chat on a phone. The **Continue** button plays the illustration; it does not send a chat message or start another teacher reply. Keep the cue's final explanation separate from this instruction and from the next assessment question. After the learner returns, read the actual completion before continuing; their “ready” alone is not proof of playback.

When the learner wants to try the button again, return to the actual application using the host's supported controls. Pause visual-dependent explanation while the illustration is hidden, especially on a phone; keep the pending question for their return. The illustration is not the running application and never counts as a practical interaction. It cannot operate editor controls or report assessment success. Ask the `preview-purpose` and `next-step` questions separately after this explanation.

## Practise returning to the general helper

For the final practical, keep this Main lesson and its pending question saved.
Open the general Colleague drawer, use its **Minimize conversation** control,
perform the requested workspace action, and restore that same Colleague with
its avatar launcher. Then return to this Learning conversation for the teacher’s
feedback. This practises getting back to the general supervisor while a task is
still in progress. Keep the exact existing Colleague leave/use/restore observation
and retained-question contract for `return-to-colleague`; hiding Main alone does
not perform that task. A teacher demonstration still needs an independent learner
attempt, and missing observations leave the task incomplete.

## Questions, practical rubrics and hints

Preserve the learner's admitted answer excerpts, grading reasons and assistance. Follow up on the missing meaning rather than demanding a long answer. After substantial help, use the fresh independent variation before recording a pass. Never transfer passes from the former `client-role`, `server-role` or `request-response` quizzes to these changed questions.

<a id="workspace-navigation"></a>
### Find the workspace locations

Ask one task at a time: “Find our practice project.” Then: “Find its coding conversation.” Finally: “Open where you can try the application.” Pass when learner gestures at native controls settle on the correct project, coding conversation and Preview with limited help. Record assistance. Teacher navigation alone, automatic route restoration or an unrelated project cannot pass. Required producer: `workspace`, operation `workspace-navigation`.

Hint only the current move: for the project, “Open the project selector and choose our practice project”; for its coding conversation, “Choose its session tab or Show chat to reveal Main”; for Preview, “Open where you can try the application.” Wait for that move before coaching the next. If a demonstration is needed, finish it before issuing a fresh independent challenge: the learner selects the practice project, reveals its Main coding conversation, then selects Preview. Keep that one new question across all three moves; the demonstrated move does not count. If settled learner observations are unavailable, leave the check incomplete and explain the missing evidence; no alternative producer is approved.

<a id="help-or-change"></a>
### Ask for help or a change

Ask: “Who could help you find Preview, and how could you get the greeting changed to Welcome?” Invite one short reply covering both situations. Pass when the answer understands that Colleague can discuss, operate Vibe64 and delegate the request, while a coding agent implements the change. Asking the coding agent directly is also valid. “I'd ask Colleague to get the coding agent to change it” is enough. If they name just one agent, acknowledge that valid way of asking, then use a short follow-up to establish the other role. Judge the meaning, not whether they remembered an agent's name.

Plausible incomplete answers: “I'll type it into Preview” mistakes the application for a chat; “Talking about it changes it” misses implementation; “I must always open the coding chat myself” misses Colleague's coordination. Explain only the missing distinction.

First hint: “You can ask Colleague to pass on a change request. Which agent then changes the application?” Fresh variation after help: “You don't know where to try the app. Who could explain that?” Then, if needed, “Who would implement a new button?” Keep these as separate questions. Do not pass a teacher-supplied answer.

After a partial answer or supported follow-up, prepare one fresh independent question for this same assessment: “In one short reply, who could help you find Preview, and who would implement a new button?” Wait for the learner's complete reply in their own words before evaluation; do not combine earlier answers or your own explanation into their evidence. Record the assistance actually provided.

<a id="try-the-application"></a>
### Use the real request button

Ask the learner to open the real Preview, press **Ask the server**, read the greeting and explain what asked and what replied in everyday words. For example, “I pressed the button in Preview and the app sent back a greeting” expresses the needed meaning; technical terms are unnecessary. Pass requires `exercise` producer operation `try-the-application`, pinned `orientation-response` check, and learner explanation. The host correlates the expected Preview frame/channel and server instance, learner button interaction, server-recorded request and response, and actual response-display observation. The bounded check confirms exact response identities; it neither grades the explanation nor authenticates the learner.

A proxy load, iframe readiness, diagram packet, teacher click or unverified browser claim cannot pass. First hint: minimise the explanation and point to the actual Preview. Repeat with a fresh button press after substantial assistance. A restart expires in-memory evidence; **Reload preview** refreshes server identity and the host channel before a fresh press. The response-display observation is fenced to the exact request/render revision; its animation-frame callback alone does not prove foreground visibility, which the host separately verifies. Missing host producer/check execution leaves this incomplete; no simulated alternative is approved.

<a id="preview-purpose"></a>
### Know where to try the result

Ask: “The agent says the application is ready. Where would you try it, and what would you look for?” Pass when the learner identifies Preview as where to use the running application and observe its behaviour. “Open Preview, try the button and see what message appears” is enough. If needed, ask “What would you look for there?” to establish that they would observe the result.

Plausible incomplete answers: “The animated picture proves it works” confuses illustration with action; “The agent said it works, so we're done” skips trying it; “I'll ask Colleague to describe it” can help but is not a check of the app.

First hint: “Where did you press the real button and see the result?” Fresh variation after help: “A new button was added. How would you check what it does?” Pass on trying it in Preview and observing the outcome, without requiring a particular phrase.

If their answer is split across follow-ups, prepare a fresh independent question asking where they would try the button and what they would look for, then wait for one compact complete learner reply.

<a id="next-step"></a>
### Give a useful next request

Use the learner's own just-observed result. After success, ask: “You just saw Hello from the server! What would you tell the agent to get Welcome instead, and how would you check it?” Invite one short reply about what they tried, what they saw, the change they want and how they would check it. Substitute their actual observation rather than inventing success. Pass on a useful request containing what they tried, what happened and what they want changed. For example: “I pressed Ask the server in Preview and saw Hello from the server. Please change that greeting to Welcome.” The same reply should explain that they would try the button in Preview again and compare the result with the requested words.

If the real press failed, ask instead: “You pressed the button and saw [their actual failure]. What would you tell Colleague or the coding agent, and how would you check a fix?” Pass on the tried action, observed failure, expected result (such as a greeting) and a plan to retry the button in Preview after recovery. Keep the practical task incomplete until genuine recovery and a new successful press. Do not fabricate a failure for this variant.

Plausible incomplete answers: “Change it” or “It's broken” leaves out the action and result; “The agent says it's fine, so I'll ignore it” skips the observation; “I must have ruined it” wrongly assumes a setup failure is the learner's fault. Ask for only the missing detail and reassure them that reporting a problem is useful.

First hint: “What did you try, what did you see, and what would you like instead?” Fresh variation after help: “Suppose a different button showed the wrong message. What would help the agent understand the problem, and how would you check a fix?” Clearly label this as a hypothetical independent question. Pass on the tried action, actual message, expected message or desired change, and a way to check the corrected result in Preview. Asking Colleague to delegate is valid; a quiz answer is not an instruction to execute its imagined change.

After separate follow-ups, prepare one fresh independent question: “In one short reply, tell me your request or problem report and how you would check the result.” Ask them to include what they tried, what they saw and what they expected or want changed, using their actual observation. Evaluate that complete reply, not a reconstruction from earlier messages or a teacher paraphrase. Record the assistance actually provided; short everyday language remains enough.

<a id="return-to-colleague"></a>
### Leave the teaching view and return

Keep a short pending question, such as “What message did you see?” Ask the learner to use **Minimize conversation**, use the workspace once and restore Colleague with its visible avatar launcher. On a phone, **Show project** and **Show chat** switch the workspace and Main coding chat; neither restores Colleague. After restoring Colleague, return to the saved Main Learning question for the teacher's feedback. Ask the retained question when they return. Pass requires `colleague` producer operation `return-to-colleague`: actual learner minimise → workspace use → restore observations, with the same retained conversation, attempt and pending question. Automatic restoration or watching a teacher cannot pass. No alternative producer is approved.

First hint: explain the single visible minimise/restore control for this device, especially on a phone. Demonstrate if needed, then ask a fresh independent leave-and-return variation. The host validates retained task identity; the learner should not have to start another chat. Minimising can leave voice active; use the visible **Stop voice chat** control if they want audio stopped.

## Recover and resume

- **Setup or Preview failure:** explain the actual state and use supported recovery when authorised. After a server restart, reload Preview before a new press. Ask for a fresh real action once ready; never substitute the animation or blame the learner.
- **Voice failure:** continue in text in the same transcript and lesson. Provisional speech is not sent evidence.
- **SVG failure:** use its text equivalent and retain understanding checks. Report missing controlled-animation proof and retry the player.
- **Interruption:** retain the pinned lesson, passed checks and pending question. Restore the visual's semantic state, paused flag and labels, then give a short recap. Frame-perfect animation recovery is not promised.
- **Missing or discarded exercise on return:** keep the saved checks and explain what is missing. Offer: “Your saved checks are safe. Would you like a fresh practice project so we can pick up where we stopped?” After a direct request or accepted offer, use `lesson.end` for that saved attempt if still active, then `lesson.continue` for its exact ended pin. Disabled old content can continue; do not select a newer lesson or take over another active one. Read the new teaching brief, recap genuine passed checks and guide the next remaining task. Earlier work and evidence stay intact; new preparation does not prove Preview runs. Read progress and retry the same end or continuation identity, as applicable, after an uncertain save. If host/content is unavailable, report that limitation and offer supported owner recovery.
- **Unsaved result:** say it is unsaved and retry through the progress owner. Do not claim durable completion until the write succeeds.

## Finish with a useful habit

Give a short, concrete recap: “You found where the coding agent works, tried the app in Preview, and practised a useful request.” Include only abilities they demonstrated and name remaining checks. All six required assessments must pass against this pinned version to finish the introduction. Offer to repeat a missed task or pause and resume. There is no second lesson promised in this preview.

Suggested takeaway: “Ask Colleague when you need help. Ask Colleague to coordinate a change, or ask the coding agent directly. Try the result in Preview. Then tell them what you tried, what happened and what you expected or want changed.”
