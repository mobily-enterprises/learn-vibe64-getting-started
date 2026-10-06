# V64-START-01: Find your way around the workspace

## Learner and assumed knowledge

For a person with no computing experience. Short everyday answers are enough. Assume the person is signed in, can open Colleague and is permitted to use approved training projects. No GitHub account, project-owner privilege or coding knowledge is needed. Offer text, voice or both; choosing audio is not assessed.

## Outcomes and what counts as success

Find the actual project, coding conversation, Colleague and Preview. Explain how this browser page asks a server for information. Press the real application's button, read its response and return to the same teaching conversation. Completion requires all six declared assessments; a teacher demonstration or opening a diagram cannot pass them.

## Required starting environment

An installed, pinned preview topic and its orientation-app exercise. Colleague uses the approved lesson-start operation to prepare a disposable project and initial session, then opens that real project. Wait for native setup/output readiness. This lesson's setup and launch are the exercise's Genesis contracts; there is no separate lesson launcher.

Explain that this is practice and that learning progress belongs to the person outside the exercise project. Questions about course coverage do not authorise project creation. An accepted lesson request authorises this bounded prepared exercise; unrelated edits, publication and other projects remain outside it. Do not offer lesson 02 while it is draft.

## Key explanations and vocabulary

A **project** holds the application's work. A **session** is the current working place and coding conversation for that project. **Colleague** helps you learn and use Vibe64. The **coding assistant** changes application code when you ask in its coding conversation. The **application** is what you are making; **Preview** lets you try it. These are distinct roles, even when they appear in one workspace.

In **this web application**, the **client** is the page in your browser. It shows a button and displays information. Its button sends a **request**, a small message asking the server to do something. The **server** is a real running program in the project's environment. It receives that request, prepares a greeting and returns a **response**. The browser displays the returned greeting. Many web applications use this arrangement; not all programs require these two parts.

A server **listens** for requests. A port helps route a request to the listening service. The server does not move into your phone when you open Preview. Preview may forward traffic through Vibe64. Use only verified runtime metadata for a concrete port; otherwise say “listening service.” The drawing is an explanation, not the application and not proof that a request happened.

## Suggested teaching stages

1. **Welcome:** explain the short outcome, disposable practice project and audio choice. Ask the learner to begin when ready.
2. **Prepare:** use approved provisioning and actual readiness. Explain failures and supported retry without inventing a running application.
3. **Orient:** name the actual project and session. Demonstrate once if helpful, then ask the learner to find the project, coding conversation and Preview themselves.
4. **Client:** show the diagram overview, highlight the browser and ask where this application's page appears. Preserve their own answer.
5. **Server:** highlight the server; explain its work. Ask who receives the button's request after it leaves the browser.
6. **Request:** send the display request `POST /api/greeting`, then pause. Ask the learner to predict what the server does before replying.
7. **Response:** show server work “Prepare a greeting,” then the reply “Hello from the server!” Ask which direction the reply travels.
8. **Real application:** return to the real Preview. The learner presses **Ask the server** and reads the output. Ask how this maps to the two sides and arrows in the diagram.
9. **Return:** ask the learner to minimise Colleague, use the workspace, then restore the same Colleague conversation. Resume the pending question.
10. **Finish:** explain what their evidence demonstrates, revisit missed checks and persist results through the assessment owner. Say the rest of this topic is being prepared; do not claim the twelve-lesson course is complete.

Allow interruptions, different wording and repeated explanations. Ask one small question at a time. Never interpret silence, a model paraphrase or speech that has not been sent as the learner's answer.

## Visual instructions

Use the declared `client-server` visual. `showOverview` and `reset` show the two sides; `highlightClient`, `highlightServer` and `highlightPort` focus one part. `highlightPort` accepts an optional verified `label`, otherwise uses the conceptual label. `sendRequest` takes display-only `method` and `path`. `showServerWork` and `sendResponse` take a short display-only `label`. `pause` keeps the reported conceptual state while pausing motion. An accepted command is not completed; wait for completion or report failure before claiming what is displayed.

Text equivalent: “Your browser sends a request down to the project's server. The server prepares information. Its response travels back up to your browser, which displays it.” Reduced motion uses the same labelled states without travel animation. On failure use this explanation and retry the diagram; conceptual answers may continue, but the controlled-player pilot has not been proved. The diagram never calls editor actions or reports assessment success.

## Real demonstrations and learner tasks

On desktop, use the actual project switcher, **Show chat** / **Show project**, and **Preview** tab. On mobile, use the same project/workspace choices and the **Preview** action. When Colleague fills the screen, its visible minimise control returns to the workspace; the compact Colleague launcher restores the same conversation. Use current available control names and actual focus receipts. Do not guess a label from a diagram or teach keyboard shortcuts that were not verified.

The exercise's page says **Ask the server**. Pressing it disables the button briefly, shows “Asking the server…”, and makes a real HTTP request. Success displays **Hello from the server!** plus a request reference. Another press makes a fresh request. Failure displays an actionable retry message, not a pretend greeting. If the server instance changed after a restart, **Ask the server** stays disabled; use the actual **Reload preview** control, then make a fresh request. Colleague may demonstrate, but then asks the learner to make a fresh request independently.

Practical evidence must come from the declared native producer with learner origin and the correct active attempt/project/session/browser context. Automatic navigation, route restoration and teacher-origin receipts are insufficient. An exercise frame/channel observation needs its real instance/request/interaction identity verified by the pinned check and an observed response display, plus the learner's explanation. No host integration means practical checks remain incomplete; do not substitute narration.

## Questions, rubrics, misconceptions and hints

<a id="workspace-navigation"></a>
### Find the workspace locations

Ask: “Show me this project, the coding conversation where you would ask for a change, and where you can try the application.” Pass when learner gestures at native controls settle on the correct project, coding conversation and Preview. Record help. Teacher navigation alone, an automatically restored route or an unrelated project cannot pass. The required producer is `workspace`, operation `workspace-navigation`.

First hint: “Look for where you can try the application.” If needed demonstrate one transition, then ask the learner to find another location themselves. If settled learner observations are unavailable, leave this check incomplete and explain the missing evidence; no alternative producer is approved.

<a id="client-role"></a>
### Explain the client

Ask: “Where is the page with the button shown, and what does that page do when you press it?” Pass on the meanings “in my browser” and “it sends a request and displays the answer.” “On my phone/computer, in the browser” is enough. An answer saying that the illustration is the running application, or that the browser runs on the project's server, needs a follow-up.

Hint: highlight the browser node and ask where they see the page. After substantial help, ask “Which side shows the greeting when it comes back?” Preserve the admitted learner answer excerpt, grading reason and assistance; highlighting alone is not an answer.

<a id="server-role"></a>
### Explain the server

Ask: “Who handles the request after it leaves the browser, and what happens there?” Pass when the learner identifies the server as receiving the request, doing work and returning information. “The program in the project prepares a greeting and sends it back” is sufficient. Do not require technical vocabulary.

Do not pass an answer that assigns this job to Colleague or the coding assistant. Hint: “The page asks another running program for the greeting.” Ask a fresh follow-up after help: “Does the server display the page on your phone, or send information back to it?” Record the learner's actual answer and assistance.

<a id="request-response"></a>
### Predict the round trip

Ask before the reply: “Where is this request going, and what might happen before we see a result?” Then ask: “Where does the response go?” Pass when answers together establish browser → server request, server work before the result, and server → browser response. Preparing a greeting is enough predicted work; examples such as calculation or looking up information are also acceptable if clearly described as possibilities.

Repeating only “client/server,” reversing a direction, or omitting one direction is incomplete. Hint: pause at the receiving side and ask what happens next. Ask a follow-up for only the missing meaning; preserve both answer excerpts rather than grading a teacher's summary.

<a id="try-the-application"></a>
### Use the real request button

Ask the learner to open the real Preview, press **Ask the server**, read the greeting and explain which part asked and which part replied. Pass requires `exercise` producer operation `try-the-application`, pinned `orientation-response` check, and learner explanation. The host must correlate the expected Preview frame/channel and server instance, learner button interaction, server-recorded request and response, and actual response-display observation. The bounded check confirms the exact response identities; it does not itself grade the explanation or authenticate the learner.

A proxy load, iframe readiness, diagram packet, teacher click or unverified browser claim cannot pass. First hint: minimise the explanation and point to the actual Preview. Repeat with a fresh button press after substantial assistance. A server restart expires in-memory evidence. If the page reports the restart, ask the learner to use **Reload preview** before making a new press; reload refreshes the server identity and host channel. The response-display observation is fenced to the exact request/render revision; its animation-frame callback alone does not prove foreground Preview visibility, which the host must separately verify. Missing host producer/check execution remains incomplete; no simulated alternative is approved.

<a id="return-to-colleague"></a>
### Leave the teaching view and return

Ask: “Minimise Colleague, use the workspace once, then return and tell me what we were checking.” Pass requires `colleague` producer operation `return-to-colleague`: actual learner minimise → workspace use → restore observations, with the same retained conversation, attempt and pending question. Restoring automatically or watching the teacher restore cannot pass. No alternative producer is approved.

First hint: explain the currently visible minimise control and compact launcher, especially on a phone. Demonstrate if needed, then ask a fresh independent leave-and-return variation. The host validates retained task identity; the learner should not have to start a new chat.

## Recovery and alternative explanations

- **Setup/Preview failure:** describe the actual status, use supported recovery when authorised, then ask for a fresh real request. If the exercise reports a restarted server, use **Reload preview** first; repeatedly pressing cannot repair the old page identity. Infrastructure failure does not become learner failure.
- **Voice failure:** continue in the same transcript in text. Do not create a replacement conversation or count provisional speech as sent evidence.
- **Diagram failure:** use the text equivalent, retain conceptual progress and report missing animation proof honestly.
- **Leaving or interruption:** retain the pinned lesson, semantic state, passed checks and last question. On return restore the declared semantic visual state, paused flag and display labels, then give a short recap and ask that pending question. Restoring a partially played animation frame is not promised.
- **Discarded exercise:** keep conceptual passes, explain the missing project and offer a fresh prepared exercise for remaining practical checks. Recreation alone never passes practical prerequisites.
- **Unsaved assessment:** show that the result is unsaved and retry through the existing progress owner. Do not promise durable completion before a successful write.

If “client” is confusing, say “the page in your browser”; if “server” is confusing, say “the running program it asks.” Return to the real button to connect these words to an observed action.

## Completion summary and next lesson

Summarise only the demonstrated abilities and name remaining checks. All six required assessments must pass against this pinned version to complete lesson 01. This topic stays an incomplete preview because lessons 02–12 are draft. Offer to repeat a short task, pause or resume; offer lesson 02 only after its reviewed published version is installed.
