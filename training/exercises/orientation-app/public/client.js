const button = document.querySelector('#ask');
const result = document.querySelector('#result');
const reference = document.querySelector('#reference');
const uuid = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u.test(value);
let instanceId, hostPort, playerInstanceId;
let reloadRequired = false;
let renderRevision = 0;
let displayedRequestId;
function emit(type, fields = {}) { hostPort?.postMessage({ protocolVersion: 1, playerInstanceId, type, instanceId, ...fields }); }
window.addEventListener('message', event => {
  const input = event.data;
  if (event.source !== window.parent || window.parent === window || hostPort || reloadRequired || !instanceId || !input || Object.keys(input).sort().join(',') !== 'playerInstanceId,protocolVersion,type' || input.type !== 'orientation-init' || input.protocolVersion !== 1 || !uuid(input.playerInstanceId) || event.ports.length !== 1) return;
  hostPort = event.ports[0];
  playerInstanceId = input.playerInstanceId;
  hostPort.start();
  emit('ready');
});
async function fetchJson(url, options) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(4000), credentials: 'same-origin' });
  if (!response.ok) throw new Error('The server did not reply successfully.');
  return response.json();
}
try {
  const data = await fetchJson('/api/instance');
  if (!uuid(data.instanceId)) throw new Error('Invalid server reference.');
  instanceId = data.instanceId;
  button.disabled = false;
  result.textContent = 'Ready. Press the button to ask for a greeting.';
  if (window.parent !== window) window.parent.postMessage({ type: 'orientation-available', protocolVersion: 1, instanceId }, '*');
} catch { result.textContent = 'Could not reach the server. Check Preview is running, then reload this page.'; }
button.addEventListener('click', async event => {
  if (button.disabled) return;
  const revision = ++renderRevision;
  displayedRequestId = undefined;
  const interactionId = crypto.randomUUID(), learnerGesture = event.isTrusted;
  // Scripted clicks run the app but do not produce learner observations.
  if (learnerGesture) emit('button', { interactionId });
  button.disabled = true; result.textContent = 'Asking the server…'; reference.textContent = '';
  try {
    if (learnerGesture) emit('request', { interactionId, method: 'POST', path: '/api/greeting' });
    const data = await fetchJson('/api/greeting', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ interactionId }) });
    if (uuid(data?.instanceId) && data.instanceId !== instanceId) {
      reloadRequired = true;
      hostPort?.close();
      hostPort = undefined;
      throw new Error('Server instance changed.');
    }
    if (!data || Object.keys(data).sort().join(',') !== 'instanceId,interactionId,message,requestId' || data.instanceId !== instanceId || data.interactionId !== interactionId || !uuid(data.requestId) || data.message !== 'Hello from the server!') throw new Error('Unexpected response.');
    const displayedReference = `Request reference: ${data.requestId}`;
    displayedRequestId = data.requestId;
    result.textContent = data.message;
    reference.textContent = displayedReference;
    // This identifies the rendered response; the host separately verifies Preview visibility.
    requestAnimationFrame(() => {
      if (
        learnerGesture &&
        revision === renderRevision &&
        displayedRequestId === data.requestId &&
        reference.textContent === displayedReference &&
        result.textContent === data.message &&
        !document.hidden
      ) {
        emit('response-displayed', { interactionId, requestId: data.requestId, message: data.message });
      }
    });
  } catch {
    result.textContent = reloadRequired
      ? 'The server restarted. Use Reload preview, then press Ask the server again.'
      : 'Could not get a greeting. Check Preview is running, then press Ask the server again.';
  }
  finally { button.disabled = reloadRequired; }
});
window.addEventListener('pagehide', () => hostPort?.close(), { once: true });
