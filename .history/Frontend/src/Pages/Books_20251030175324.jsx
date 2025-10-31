import React, { useState } from "react";
import BookCard from "../shared/BookCard";
import UserModal from "../shared/UserModal";

const sampleBooks = [
  { id: 1, title: "Becoming", author: "Michelle Obama", available: 11, cover: "" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho", available: 14, cover: "" },
  { id: 3, title: "Harry Potter", author: "J.K. Rowling", available: 3, cover: "" },
  { id: 4, title: "The Lord of the Rings", author: "J.R.R. Tolkien", available: 2, cover: "" },
  // ... add more mock items
];

export default function Books({ user, onLogout }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">All Books</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-700">{user?.name}</div>
          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-1 rounded-md border"
          >
            Open
          </button>
        </div>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleBooks.map(b => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </main>

      <UserModal
        open={showModal}
        user={user}
        onClose={() => setShowModal(false)}
        onLogout={() => { setShowModal(false); onLogout(); }}
      />
    </div>
  );
}
