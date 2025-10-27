// frontend/src/pages/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get('http://localhost:5000/api/books', { withCredentials: true });
      setBooks(res.data);
    };
    fetchBooks();
  }, []);

  const borrowBook = async (bookId) => {
    await axios.post('http://localhost:5000/api/borrows', { bookId }, { withCredentials: true });
    // Update UI
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title} <button onClick={() => borrowBook(book.id)}>Borrow</button></li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;