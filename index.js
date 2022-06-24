require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');


const userRouter = require('./src/user');
const contactRouter = require('./src/contact');




mongoose.connect("mongodb://localhost:27017/addressbookdb")
.then(()=>{console.log("connected to DB")})
.catch((err)=>{
    console.log(err)
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/contacts', authMiddleware(), contactRouter);

app.listen(3000, () => console.log('Server running'));