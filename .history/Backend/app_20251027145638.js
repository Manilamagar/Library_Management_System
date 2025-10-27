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
const userRoutes = require('./Routes/UsersRoutes');
const bookRoutes = require('./Routes/BooksRoutes');
const borrowRoutes = require('./Routes/BorrowRoutes');



// Routes (we'll add later)
app.use('/api/auth', authRoutes);
app.use('/api/users', UsersRoutes);
app.use('/api/books', BookRoutes);
app.use('/api/borrows', BorrowRoutes);


dotenv.config();




app.get('/', (req, res) => {
    res.send('Welcome to the INC Pustakalaya API');
});
app.get("/", (req, res) => {
    res.render("");
});



app.listen(5002,(req,res)=>{
    console.log("Server is running on port 5002");
})