const API_URL = "http://localhost:3000/notes";

const loadNotes = async () => {
  const res = await fetch(API_URL);
  const notes = await res.json();
  const list = document.getElementById("notes-list");
  list.innerHTML = "";

  notes.forEach((note) => {
    list.innerHTML += `
                    <div class="note">
                        <strong>${note.title}</strong> (${note.subject}) - <i>${note.created_date}</i>
                        <p>${note.description}</p>
                        <button onclick="updateNote('${note._id}', '${note.title}', '${note.description}')">Edit</button>
                        <button onclick="deleteNote('${note._id}')">Delete</button>
                    </div>
                `;
  });
};

const addNote = async () => {
  const data = {
    title: document.getElementById("title").value,
    subject: document.getElementById("subject").value,
    description: document.getElementById("desc").value,
  };
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  loadNotes();
};

const updateNote = async (id, oldTitle, oldDesc) => {
  const newTitle = prompt("Enter new title:", oldTitle);
  const newDesc = prompt("Enter new description:", oldDesc);
  if (!newTitle || !newDesc) return;

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle, description: newDesc }),
  });
  loadNotes();
};

const deleteNote = async (id) => {
  if (!confirm("Delete this note?")) return;
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadNotes();
};

loadNotes();
