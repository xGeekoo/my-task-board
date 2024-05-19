export async function updateTask(updatedTask, taskId, boardId) {
  const res = await fetch(`/api/v1/boards/${boardId}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask)
  });
  const json = await res
    .json()
    .catch(() => new Error('Invalid response format. The API might be down.'));
  if (!res.ok) throw new Error(json.message);
  return json.data.board;
}

export async function createTask(boardId) {
  const res = await fetch(`/api/v1/boards/${boardId}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'New Task', icon: '👨‍💻', status: 'created' })
  });
  const json = await res
    .json()
    .catch(() => new Error('Invalid response format. The API might be down.'));
  if (!res.ok) throw new Error(json.message);
  return json.data.board;
}

export async function deleteTask(boardId, taskId) {
  const res = await fetch(`/api/v1/boards/${boardId}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await res
    .json()
    .catch(() => new Error('Invalid response format. The API might be down.'));
  if (!res.ok) throw new Error(json.message);
  return json.data;
}
