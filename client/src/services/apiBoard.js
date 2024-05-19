export async function getBoard(id) {
  const res = await fetch(`/api/v1/boards/${id}`);
  const json = await res
    .json()
    .catch(() => new Error('Invalid response format. The API might be down.'));
  if (!res.ok) throw new Error(json.message);
  return json.data.board;
}

export async function createBoard() {
  const res = await fetch('/api/v1/boards', { method: 'POST' });
  const json = await res
    .json()
    .catch(() => new Error('Invalid response format. The API might be down.'));
  if (!res.ok) throw new Error(json.message);
  return json.data.board;
}

export async function updateBoard(name, boardId) {
  const res = await fetch(`/api/v1/boards/${boardId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  const json = await res
    .json()
    .catch(() => new Error('Invalid response format. The API might be down.'));
  if (!res.ok) throw new Error(json.message);
  return json.data.board;
}
