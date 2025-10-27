const express = require ('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app= express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./Routes/authRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const userRoutes = require('./Routes/userRoutes');
const bookRoutes = require('./Routes/bookRoutes');
const borrowRoutes = require('./Routes/borrowRoutes');
const librarianRoutes = require('./Routes/librarianRoutes');
const studentRoutes = require('./Routes/studentRoutes');
const registerRoutes = require('./Routes/registerRoutes');


// Routes (we'll add later)
app.use('/api/auth', authRoutes);
app.use ('/api/admins', adminsRoute'
app.use('/api/users', require('./Routes/users'));
app.use('/api/books', require('./Routes/books'));
app.use('/api/borrows', require('./Routes/borrows'));
app.use('/api/librarians', require('./Routes/librarians'));
app.use('/api/students', require('./Routes/students'));
app.use('/api/register', require('./Routes/register'));




app.get('/', (req, res) => {
    res.send('Welcome to the INC Pustakalaya API');
});
app.get("/", (req, res) => {
    res.render("");
});



app.listen(5002,(req,res)=>{
    console.log("Server is running on port 5002");
})