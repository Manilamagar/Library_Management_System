const express = required ('express');
const cors = requires('cors');
const bodyParser = requires('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app= express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes (we'll add later)
app.use('/api/auth', require('./routes/auth'));
app.use ('/api/admins', require('./Routes/admins'));
app.use('/api/users', require('./routes/users'));
app.use('/api/books', require('./routes/books'));
app.use('/api/borrows', require('./routes/borrows'));




app.get('/', (req, res) => {
    res.send('Welcome to the INC Pustakalaya API');
});
app.get("/", (req, res) => {
    res.render("");
});



app.listen(5002,(req,res)=>{
    console.log("Server is running on port 5000");
})