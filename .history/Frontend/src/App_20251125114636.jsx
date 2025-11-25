import React, { useState, useEffect } from "react";

/*
  Simple Library Management frontend App (single-file)
  - Keeps books in localStorage for demo purposes
  - Add / Edit / Delete / Check out / Return
  - Minimal, self-contained, ready for expansion
*/

const STORAGE_KEY = "lms_books_v1";

function Header() {
  return (
    <header style={styles.header}>
      <h1 style={{ margin: 0 }}>Library Management</h1>
    </header>
  );
}

function BookForm({ onSave, editingBook, onCancel }) {
  const [title, setTitle] = useState(editingBook?.title || "");
  const [author, setAuthor] = useState(editingBook?.author || "");
  const [year, setYear] = useState(editingBook?.year || "");

  useEffect(() => {
    setTitle(editingBook?.title || "");
    setAuthor(editingBook?.author || "");
    setYear(editingBook?.year || "");
  }, [editingBook]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    onSave({
      ...editingBook,
      title: title.trim(),
      author: author.trim(),
      year: year ? String(year).slice(0, 4) : "",
    });
    setTitle("");
    setAuthor("");
    setYear("");
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
        required
      />
      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={styles.input}
        required
      />
      <input
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        style={styles.input}
        type="number"
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" style={styles.buttonPrimary}>
          {editingBook ? "Update" : "Add Book"}
        </button>
        {editingBook && (
          <button type="button" onClick={onCancel} style={styles.button}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function BookList({ books, onEdit, onDelete, onToggleCheckout }) {
  if (!books.length) {
    return <p style={{ padding: 12 }}>No books in library.</p>;
  }

  return (
    <ul style={styles.list}>
      {books.map((b) => (
        <li key={b.id} style={styles.listItem}>
          <div>
            <strong>{b.title}</strong> <span style={{ color: "#555" }}>by {b.author}</span>
            <div style={{ fontSize: 12, color: "#666" }}>{b.year}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => onToggleCheckout(b.id)} style={styles.button}>
              {b.checkedOut ? "Return" : "Check Out"}
            </button>
            <button onClick={() => onEdit(b)} style={styles.button}>
              Edit
            </button>
            <button onClick={() => onDelete(b.id)} style={styles.buttonDanger}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBooks(JSON.parse(raw));
      else {
        // seed data
        setBooks([
          { id: genId(), title: "1984", author: "George Orwell", year: "1949", checkedOut: false },
          { id: genId(), title: "To Kill a Mockingbird", author: "Harper Lee", year: "1960", checkedOut: true },
        ]);
      }
    } catch (e) {
      setBooks([]);
    }
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  function handleSave(book) {
    if (book.id) {
      setBooks((prev) => prev.map((b) => (b.id === book.id ? { ...b, ...book } : b)));
      setEditingBook(null);
    } else {
      setBooks((prev) => [{ ...book, id: genId(), checkedOut: false }, ...prev]);
    }
  }

  function handleEdit(book) {
    setEditingBook(book);
  }

  function handleCancelEdit() {
    setEditingBook(null);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this book?")) return;
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  function handleToggleCheckout(id) {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, checkedOut: !b.checkedOut } : b)));
  }

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <section style={styles.panel}>
          <h2 style={styles.h2}>{editingBook ? "Edit Book" : "Add Book"}</h2>
          <BookForm onSave={handleSave} editingBook={editingBook} onCancel={handleCancelEdit} />
        </section>

        <section style={styles.panel}>
          <h2 style={styles.h2}>Books</h2>
          <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} onToggleCheckout={handleToggleCheckout} />
        </section>
      </main>
    </div>
  );
}

/* Helpers */
function genId() {
  return Math.random().toString(36).slice(2, 9);
}

const styles = {
  container: { fontFamily: "system-ui, Arial, sans-serif", minHeight: "100vh", background: "#f5f7fb" },
  header: { padding: 16, background: "#1f6feb", color: "white" },
  main: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, padding: 16 },
  panel: { background: "white", borderRadius: 8, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  h2: { marginTop: 0 },
  form: { display: "flex", gap: 8, flexDirection: "column" },
  input: { padding: 8, borderRadius: 6, border: "1px solid #ddd", width: "100%" },
  button: { padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", background: "white", cursor: "pointer" },
  buttonPrimary: { padding: "8px 12px", borderRadius: 6, border: "none", background: "#1f6feb", color: "white", cursor: "pointer" },
  buttonDanger: { padding: "8px 12px", borderRadius: 6, border: "none", background: "#ff6b6b", color: "white", cursor: "pointer" },
  list: { listStyle: "none", margin: 0, padding: 0 },
  listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, borderBottom: "1px solid #f0f0f0" },
};