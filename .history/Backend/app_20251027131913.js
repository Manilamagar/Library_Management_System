const express = required ('express');
const cors = requires('cors');
const bodyParser = requires('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app= express();

app.use(cors({ origin: 'http://localhost:3002', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes (we'll add later)
app.use('/api/auth', require('./routes/auth'));
app.use ('/api/')
app.use('/api/users', require('./routes/users'));
app.use('/api/books', require('./routes/books'));
app.use('/api/borrows', require('./routes/borrows'));