import React, { useEffect, useState } from 'react';
const res = await axios.get('http://localhost:5000/api/books');
setBooks(res.data);
} catch (err) {
setMsg('Error loading books');
}
};


useEffect(() => { fetchBooks(); }, []);


const handleDelete = async (id) => {
if (!window.confirm('Delete this book?')) return;
try {
await axios.delete(`http://localhost:5000/api/books/${id}`);
setBooks(books.filter(b => b.id !== id));
} catch (err) {
setMsg('Delete failed');
}
};


return (
<div className="p-6">
<h2 className="text-xl font-bold mb-4">All Books</h2>
{msg && <div className="text-red-500 mb-3">{msg}</div>}


<table className="w-full table-auto border">
<thead>
<tr className="bg-gray-100">
<th className="p-2 border">#</th>
<th className="p-2 border">Title</th>
<th className="p-2 border">Author</th>
<th className="p-2 border">ISBN</th>
<th className="p-2 border">Qty</th>
<th className="p-2 border">Actions</th>
</tr>
</thead>
<tbody>
{books.map((b, idx) => (
<tr key={b.id}>
<td className="p-2 border">{idx + 1}</td>
<td className="p-2 border">{b.title}</td>
<td className="p-2 border">{b.author}</td>
<td className="p-2 border">{b.isbn}</td>
<td className="p-2 border">{b.quantity}</td>
<td className="p-2 border space-x-2">
<Link to={`/books/edit/${b.id}`} className="px-2 py-1 bg-yellow-300 rounded">Edit</Link>
<button onClick={() => handleDelete(b.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
)};


export default ViewBooks;