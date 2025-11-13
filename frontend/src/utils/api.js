const BASE = "http://localhost:4000";

export async function register(username, password) {
  const res = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function getNotes(token) {
  const res = await fetch(`${BASE}/notes`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}

export async function createNote(token, encryptedNote) {
  const res = await fetch(`${BASE}/notes`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ note: encryptedNote })
  });
  return res.json();
}

export async function updateNote(token, noteId, encryptedNote) {
  const res = await fetch(`${BASE}/notes/${noteId}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ note: encryptedNote })
  });
  return res.json();
}

export async function deleteNote(token, noteId) {
  const res = await fetch(`${BASE}/notes/${noteId}`, {
    method: "DELETE",
    headers: { 
      "Authorization": `Bearer ${token}`
    }
  });
  return res.json();
}
