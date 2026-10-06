# Client/server visual contract (protocol version 1)

The public Vibe64 player owns the sandbox iframe and MessageChannel handshake. After checking the exact frame/window and fresh player instance, its sandbox bootstrap inserts this validated SVG and calls the ES-module export `mountVisual(svgElement, transferredPort, init)`. `init` has `protocolVersion:1`, bounded `playerInstanceId`, `initialState` chosen from the declared descriptor states, boolean `reducedMotion`, and an optional semantic `snapshot`. Fresh initialization uses the descriptor initial state and canonical labels with paused=false. Origin alone does not authenticate an opaque sandbox frame. The bootstrap and controller receive no editor DOM, actions or credentials. Restrict the iframe to required scripts, without same-origin privileges, forms, popups or navigation; content policy permits only validated local assets and no network connections.

All port messages include `protocolVersion:1` and `playerInstanceId`. The controller sends `ready` with declared command names, state and text description. The host sends `command` with `commandId`, `name` and an explicit `parameters` object, or `snapshot` with `requestId`. Command responses are `accepted`, then `completed` with state/description, or `failed` with bounded code/description/state. Snapshot replies include requestId, state, paused, bounded display labels and description. Acknowledgement is not completion. Host waits with its bounded timeout and ignores stale channels. The disposer closes this controller's port and stops its animation.

Commands are serial, except pause/reset can interrupt motion. Pause cancels travel and reports the last completed semantic state, then completes unchanged with paused text. The interrupted command fails explicitly. Repeat the transition with a fresh command ID to continue; reset restores overview. Duplicate known IDs return their existing result with the original completion/failure state and description; they do not replay motion or change what is now displayed. Use a fresh snapshot to inspect the current displayed state. Active duplicates return accepted, and conflicting reuse fails. The controller retains at most 64 results; IDs outside that retry window require a host reset/recreated instance, never an unacknowledged retry. Labels are bounded textContent only, never HTML, script or selectors. Parameter lengths in visual.json match the controller. Restoration preserves the semantic snapshot described below; partially played animation frames and the old receipt cache are never restored.

Reduced motion skips packet travel and immediately displays the same completed state and accessible description. The compact 480×344 layout keeps the page, request, running app and reply visible together in a narrow Preview. Display text starts at 20 SVG units (about 14.6 pixels at 350 pixels wide); arrows carry both text and colour cues. The packet starts at (40,104), travels 172 units down for the request, then 172 units up on the reply lane 400 units to the right. Only the matching reply-lane translation changes; timing and command semantics are unchanged. Text equivalent: “The browser asks the project's server. The server does work and replies. The browser displays that reply.” No command calls an application action or claims a learner pass. A real orientation application response must come from its separate exercise producer/check.

## Semantic restoration input

The optional `init.snapshot` has exactly these fields:

```json
{
  "state": "response-arrived",
  "paused": true,
  "labels": {
    "port": "Service on port 8080",
    "request": "POST /api/greeting",
    "work": "Prepare a greeting",
    "response": "A real greeting"
  }
}
```

The host extracts only `state`, `paused` and `labels` from a snapshot response; protocol IDs, requestId and description remain in the transport envelope and are not initialization state. Supply a fresh `playerInstanceId` and set required `initialState` to `snapshot.state`; disagreement fails rather than selecting a second authority. State must be declared, paused must be boolean, and all four labels are required nonempty single-line strings with maximum lengths port 28 / request 33 / work 32 / response 32. Request 33 accommodates method 8, one space and path 24. Control characters, extra/missing fields and unknown states are rejected before ready. The controller copies labels and renders the restored state and paused description before emitting ready. It does not restart motion, restore animation frames or reuse the old command-result cache. With snapshot absent, fresh defaults remain unchanged.
