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
const UsersRoutes = require('./Routes/UsersRoutes');
const BooksRoutes = require('./Routes/BookRoutes');
const BorrowsRoutes = require('./Routes/BorrowsRoutes');



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



app.listen(3002,(req,res)=>{
    console.log("Server is running on port 3002");
})