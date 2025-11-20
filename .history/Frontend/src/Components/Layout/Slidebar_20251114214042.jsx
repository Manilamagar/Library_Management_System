import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
return (
<aside className="w-64 bg-gray-50 h-screen p-4 border-r">
<ul className="space-y-2">
<li><Link to="/" className="block p-2 rounded hover:bg-gray-100">Dashboard</Link></li>
<li><Link to="/books" className="block p-2 rounded hover:bg-gray-100">View Books</Link></li>
<li><Link to="/books/add" className="block p-2 rounded hover:bg-gray-100">Add Book</Link></li>
<li><Link to="/books/borrow" className="block p-2 rounded hover:bg-gray-100">Borrow / Return</Link></li>
<li><Link to="/search" className="block p-2 rounded hover:bg-gray-100">Search Books</Link></li>
</ul>
</aside>
);
};


export default Sidebar;