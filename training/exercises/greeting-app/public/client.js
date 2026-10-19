const button = document.querySelector('#ask');
const result = document.querySelector('#result');
const count = document.querySelector('#count');
button.addEventListener('click', async () => {
  button.disabled = true; result.textContent = 'Asking the server…'; count.textContent = '';
  try {
    const response = await fetch('/api/greeting', { method: 'POST', signal: AbortSignal.timeout(4000), credentials: 'same-origin' });
    const data = await response.json().catch(() => ({}));
    if (Number.isInteger(data.presses)) count.textContent = `The server has counted ${data.presses} press${data.presses === 1 ? '' : 'es'} so far.`;
    result.textContent = response.ok && typeof data.message === 'string'
      ? data.message
      : data.error || 'Could not get a greeting. Check Preview is running, then press Ask the server again.';
  } catch {
    result.textContent = 'Could not reach the server. Check Preview is running, then press Ask the server again.';
  } finally { button.disabled = false; }
});
