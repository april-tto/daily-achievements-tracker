const express = require("express");
require('dotenv').config();
const app = express()

const connectDB = require("./shared/middlewares/connect-db.js");
const connect = require('mongoose');

//application-level middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((err,req,res,next) => {
    console.log(err);
    res.status(500).send("Oops! Internal server error");
})

app.use((err,req,res,next) => {
    console.log(err);
    res.status(404).send(`Error! ${req.method} ${req.path} was not found`)
})

//connect DB
app.use(connectDB);

//running server to test
hostname = "127.0.0.1"
port = 3000

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})