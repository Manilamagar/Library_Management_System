import { useEffect, useState } from 'react';
import API from '../../services';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await API.get('/books');
    setBooks(res.data);
  };

  const deleteBook = async (id) => {
    if (confirm('Delete this book?')) {
      await API.delete(`/books/${id}`);
      toast.success('Book deleted');
      fetchBooks();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Books</h1>
        <Link to="/books/add" className="btn-primary">
          Add Book
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book._id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Copies: {book.copiesAvailable}</p>
            <div className="mt-2 flex gap-2">
              <Link to={`/books/edit/${book._id}`} className="btn-sm btn-warning">
                Edit
              </Link>
              <button onClick={() => deleteBook(book._id)} className="btn-sm btn-danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};