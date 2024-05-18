export async function getBoard(id) {
  const res = await fetch(`/api/v1/boards/${id}`);
  const json = await res
    .json()
    .catch(err => new Error('Invalid response format. The API might be down.'));
  if (!res.ok) throw new Error(json.message);
  return json.data.board;
}

export async function createBoard() {
  const res = await fetch('/api/v1/boards', { method: 'POST' });
  const json = await res
    .json()
    .catch(err => new Error('Invalid response format. The API might be down.'));
  if (!res.ok) throw new Error(json.message);
  return json.data.board;
}
