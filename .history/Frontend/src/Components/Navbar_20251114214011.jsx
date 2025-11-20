import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
const { user, logout } = useContext(AuthContext);


return (
<nav className="w-full bg-white shadow p-4 flex justify-between items-center">
<div className="text-xl font-bold">Library Management</div>
<div className="flex items-center gap-4">
{user ? (
<>
<div className="capitalize">{user.name} ({user.role})</div>
<button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
</>
) : (
<div>Not logged in</div>
)}
</div>
</nav>
);
};


export default Navbar;