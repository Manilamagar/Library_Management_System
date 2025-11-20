import { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: "",
  });

  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3002/api/books", book);
      setMsg("Book added successfully!");
      setBook({ title: "", author: "", isbn: "", quantity: "" });
    } 
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>

      {msg && <p className="text-green-600 mb-4">{msg}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 w-96">

        <input
          type="text"
          placeholder="Book Title"
          className="border p-2 rounded"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Author"
          className="border p-2 rounded"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        />

        <input
          type="text"
          placeholder="ISBN"
          className="border p-2 rounded"
          value={book.isbn}
          onChange={(e) => setBook({ ...book, isbn: e.target.value })}
        />

        <input
          type="number"
          placeholder="Quantity"
          className="border p-2 rounded"
          value={book.quantity}
          onChange={(e) => setBook({ ...book, quantity: e.target.value })}
        />

        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
