// Called only by the host-owned sandbox bootstrap after it transfers the expected channel.
export function mountVisual(svg, port, init) {
  const states = ['overview', 'client-highlighted', 'server-highlighted', 'port-highlighted', 'request-arrived', 'server-working', 'response-arrived'];
  const commands = {
    showOverview: { state: 'overview', parameters: {} },
    highlightClient: { state: 'client-highlighted', parameters: {} },
    highlightServer: { state: 'server-highlighted', parameters: {} },
    highlightPort: { state: 'port-highlighted', parameters: { label: [false, 28] } },
    sendRequest: { state: 'request-arrived', parameters: { method: [true, 8], path: [true, 24] } },
    showServerWork: { state: 'server-working', parameters: { label: [true, 32] } },
    sendResponse: { state: 'response-arrived', parameters: { label: [true, 32] } },
    pause: { state: 'unchanged', parameters: {} },
    reset: { state: 'overview', parameters: {} }
  };
  const descriptions = {
    overview: 'You pressed a button in Preview. The practice app prepares a greeting and the page displays its reply.',
    'client-highlighted': 'This is the page you tried in Preview. Its button asks the practice app for a greeting.',
    'server-highlighted': 'The practice app runs in the project environment. It prepares the greeting requested by the page.',
    'port-highlighted': 'The page reaches the running practice app in the project environment.',
    'request-arrived': 'The page asked the practice app for a greeting after your button press.',
    'server-working': 'The practice app is preparing its reply to the page.',
    'response-arrived': 'The greeting came back to the page, where you read it in Preview.'
  };
  const identity = value => typeof value === 'string' && /^[a-zA-Z0-9-]{1,64}$/u.test(value);
  if (
    !init ||
    init.protocolVersion !== 1 ||
    !identity(init.playerInstanceId) ||
    !states.includes(init.initialState) ||
    typeof init.reducedMotion !== 'boolean' ||
    Object.keys(init).some(key => !['protocolVersion', 'playerInstanceId', 'initialState', 'reducedMotion', 'snapshot'].includes(key))
  ) throw new Error('Invalid visual initialization.');
  const snapshot = init.snapshot;
  if (snapshot !== undefined) {
    if (
      !snapshot ||
      typeof snapshot !== 'object' ||
      Array.isArray(snapshot) ||
      Object.keys(snapshot).sort().join(',') !== 'labels,paused,state' ||
      !states.includes(snapshot.state) ||
      snapshot.state !== init.initialState ||
      typeof snapshot.paused !== 'boolean'
    ) throw new Error('Invalid semantic snapshot.');
    if (
      !snapshot.labels ||
      typeof snapshot.labels !== 'object' ||
      Array.isArray(snapshot.labels) ||
      Object.keys(snapshot.labels).sort().join(',') !== 'port,request,response,work'
    ) throw new Error('Invalid snapshot labels.');
    for (const [key, max] of Object.entries({ port: 28, request: 33, work: 32, response: 32 })) {
      const value = snapshot.labels[key];
      if (typeof value !== 'string' || !value.trim() || value.length > max || /[\u0000-\u001f\u007f]/u.test(value)) throw new Error('Invalid snapshot display text.');
    }
  }
  const nodes = Object.fromEntries(['client', 'server', 'port', 'packet', 'description', 'request-label', 'response-label', 'work-label', 'port-label'].map(id => [id, svg.querySelector(`#${id}`)]));
  if (Object.values(nodes).some(node => !node)) throw new Error('Missing declared SVG node.');
  let state = init.initialState, paused = snapshot?.paused ?? false, animation, active;
  let labels = snapshot ? { ...snapshot.labels } : { port: 'Running app', request: 'Page asks for a greeting', work: 'Prepares a greeting', response: 'Greeting returns' };
  const history = new Map();
  const description = () => `${paused ? 'Motion paused. ' : ''}${descriptions[state]}`;
  function send(type, fields = {}) { port.postMessage({ protocolVersion: 1, playerInstanceId: init.playerInstanceId, type, state, ...fields }); }
  function render() {
    const highlighted = ['client-highlighted', 'server-highlighted', 'port-highlighted'].includes(state);
    for (const id of ['client', 'server', 'port']) {
      nodes[id].style.opacity = highlighted && state !== `${id}-highlighted` ? '.6' : '1';
    }
    nodes['port-label'].textContent = labels.port; nodes['request-label'].textContent = labels.request;
    nodes['work-label'].textContent = labels.work; nodes['response-label'].textContent = labels.response;
    nodes.packet.style.transform = state === 'request-arrived' || state === 'server-working' ? 'translate(0px,172px)' : state === 'response-arrived' ? 'translate(156px,0px)' : 'translate(0px,0px)';
    nodes.packet.style.opacity = ['request-arrived', 'server-working', 'response-arrived'].includes(state) ? '1' : '0';
    nodes.description.textContent = description();
  }
  function record(commandId, input, type, fields) {
    const result = { type, fields: { state, ...fields } };
    history.set(commandId, { input, result });
    if (history.size > 64) history.delete(history.keys().next().value);
    send(type, { commandId, ...result.fields });
  }
  function interrupt() {
    if (!active) return;
    animation?.cancel(); animation = undefined;
    record(active.commandId, active.input, 'failed', { code: 'interrupted', description: 'Motion stopped at the last declared state. Repeat the transition to continue.' }); active = undefined;
  }
  async function run(message) {
    const command = commands[message.name];
    if (!command || !message.parameters || typeof message.parameters !== 'object' || Array.isArray(message.parameters)) throw new Error('Unknown command or invalid parameters.');
    for (const key of Object.keys(message.parameters)) if (!Object.hasOwn(command.parameters, key)) throw new Error('Unknown parameter.');
    for (const [key, [required, max]] of Object.entries(command.parameters)) {
      const value = message.parameters[key];
      if (value === undefined && !required) continue;
      if (typeof value !== 'string' || !value.trim() || value.length > max || /[\u0000-\u001f\u007f]/u.test(value)) throw new Error('Invalid display text.');
    }
    const input = JSON.stringify([message.name, Object.keys(message.parameters).sort().map(key => [key, message.parameters[key]])]);
    const previous = history.get(message.commandId);
    if (previous) {
      if (previous.input !== input) throw new Error('Command ID was already used for a different command.');
      send(previous.result.type, { commandId: message.commandId, ...previous.result.fields }); return;
    }
    if (active?.commandId === message.commandId) {
      if (active.input !== input) throw new Error('Command ID is already active with different input.');
      send('accepted', { commandId: message.commandId }); return;
    }
    if (active && !['pause', 'reset'].includes(message.name)) throw new Error('A command is still running.');
    send('accepted', { commandId: message.commandId });
    if (message.name === 'pause') { paused = true; interrupt(); render(); record(message.commandId, input, 'completed', { description: description() }); return; }
    if (message.name === 'reset') {
      interrupt(); labels = { port: 'Running app', request: 'Page asks for a greeting', work: 'Prepares a greeting', response: 'Greeting returns' };
    }
    paused = false;
    if (message.name === 'highlightPort') labels.port = message.parameters.label || 'Running app';
    if (message.name === 'sendRequest') labels.request = `${message.parameters.method} ${message.parameters.path}`;
    if (message.name === 'showServerWork') labels.work = message.parameters.label;
    if (message.name === 'sendResponse') labels.response = message.parameters.label;
    const operation = { commandId: message.commandId, input }; active = operation;
    if (!init.reducedMotion && ['sendRequest', 'sendResponse'].includes(message.name)) {
      const request = message.name === 'sendRequest';
      animation = nodes.packet.animate(request ? [{ transform: 'translate(0px,0px)', opacity: 1 }, { transform: 'translate(0px,172px)', opacity: 1 }] : [{ transform: 'translate(156px,172px)', opacity: 1 }, { transform: 'translate(156px,0px)', opacity: 1 }], { duration: 900, easing: 'ease-in-out' });
      try { await animation.finished; } catch { return; }
      if (active !== operation) return;
      animation = undefined;
    }
    state = command.state; active = undefined; render(); record(message.commandId, input, 'completed', { description: description() });
  }
  port.onmessage = event => {
    const message = event.data;
    if (!message || message.protocolVersion !== 1 || message.playerInstanceId !== init.playerInstanceId) return;
    if (message.type === 'snapshot' && Object.keys(message).sort().join(',') === 'playerInstanceId,protocolVersion,requestId,type' && identity(message.requestId)) { send('snapshot', { requestId: message.requestId, paused, labels: { ...labels }, description: description() }); return; }
    if (message.type !== 'command' || Object.keys(message).sort().join(',') !== 'commandId,name,parameters,playerInstanceId,protocolVersion,type' || !identity(message.commandId)) return;
    run(message).catch(error => send('failed', { commandId: message.commandId, code: 'invalid-command', description: error.message.slice(0, 256) }));
  };
  render(); port.start(); send('ready', { commands: Object.keys(commands), description: description() });
  return () => { interrupt(); port.onmessage = null; port.close(); };
}
