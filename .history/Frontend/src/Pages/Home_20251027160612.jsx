import React from 'react';

const Home = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Welcome to the Library Management System</h1>
            <p>
                Manage your library efficiently. Browse books, manage members, and keep track of issued and returned books.
            </p>
            <ul>
                <li>View available books</li>
                <li>Issue and return books</li>
                <li>Manage library members</li>
                <li>Track overdue books</li>
            </ul>
        </div>
    );
};

export default 