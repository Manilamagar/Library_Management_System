const express = require ('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
const path = require('path');

const app= express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like HTML)
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./Routes/authRoutes');
const UsersRoutes = require('./Routes/UserRoutes');
const BookRoutes = require('./Routes/BookRoutes');
const BorrowsRoutes = require('./Routes/BorrowRoutes');



// Routes (we'll add later)
app.use('/api/auth', authRoutes);
app.use('/api/Users', UsersRoutes);
app.use('/api/Book', BookRoutes);
app.use('/api/Borrows', BorrowsRoutes);


dotenv.config();




app.get('/', (req, res) => {
    res.send('Welcome to the INC Pustakalaya API');
});
app.get("/", (req, res) => {
    res.render("");
});
// GET route to show register page
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register."));
});

// POST route to save registration
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) throw err;
    console.log("User registered:", result);
    res.send("✅ Registration successful!");
  });
});



app.listen(3002,(req,res)=>{
    console.log("Server is running on port 3002");
})