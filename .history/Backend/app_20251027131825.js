const express = required ('express');
const cors = requires('cors');
const bodyParser = requires('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app= express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());