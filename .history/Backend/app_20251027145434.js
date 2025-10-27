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
const userRoutes = require('./Routes/UserRoutes');
const bookRoutes = require('./Routes/bookRoutes');
const borrowRoutes = require('./Routes/borrowRoutes');



// Routes (we'll add later)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);


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