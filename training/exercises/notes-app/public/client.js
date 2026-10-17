const list = document.querySelector('#notes');
const status = document.querySelector('#status');
const notebook = document.querySelector('#notebook');
async function request(path, options) {
  const response = await fetch(path, options);
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || 'The server could not complete that.');
  return body;
}
async function showNotes() {
  const notes = await request('/api/notes');
  list.replaceChildren(...notes.map(note => {
    const item = document.createElement('li');
    item.textContent = `${note.title} `;
    const detail = document.createElement('small');
    detail.textContent = `${note.notebook} · ${note.created_at}`;
    item.append(detail);
    return item;
  }));
}
document.querySelector('#add').addEventListener('submit', async event => {
  event.preventDefault();
  const title = document.querySelector('#title');
  try {
    await request('/api/notes', { method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: title.value, notebookId: Number(notebook.value) }) });
    title.value = '';
    status.textContent = 'Saved.';
    await showNotes();
  } catch (error) { status.textContent = error.message; }
});
try {
  const notebooks = await request('/api/notebooks');
  notebook.replaceChildren(...notebooks.map(row => new Option(row.name, row.id)));
  await showNotes();
} catch (error) { status.textContent = error.message; }
