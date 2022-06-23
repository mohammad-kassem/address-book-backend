require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


mongoose.connect("mongodb://localhost:27017/addressbookdb")
.then(()=>{console.log("connected to DB")})
.catch((err)=>{
    console.log(err)
});
