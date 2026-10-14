# Client/server explanation

## Sources

- `training/visuals/client-server/visual.json`
- `training/visuals/client-server/diagram.svg`
- Main: `training/visuals/client-server/controller.js`

## Public contract

Declared commands illustrate the learner's real Preview button press: the page
asks, the practice app prepares a greeting, and the reply returns. Beginner-facing
labels describe this observable action; command/state IDs retain their original
browser/server vocabulary. No networking terminology is assessed.

Commands highlight roles and move the original packet between the page and project
server. Reduced motion displays the same semantic states immediately. The host
sandbox transfers a private channel; the controller reports acknowledgement,
completion/failure and small snapshots without accessing editor actions,
credentials or grading. Pause cancels motion at the last completed semantic state;
repeating the transition continues from that known state.

Retried known command IDs return the originally recorded result state and description without replaying or changing the current drawing. A fresh snapshot reports the current displayed state.

Optional initialization snapshot restores the declared state, boolean paused flag and copied bounded labels before ready. Its state must equal initialState. Transport envelopes, command receipt caches and partially played frames are not restored. Fresh initialization keeps default labels and pause=false.
