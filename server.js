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


//login page
app.get("/login", (req, res, next) => {
    res.send("logged in!")
})

//home page
app.get("/home", (req, res, next) => {
        res.send("todays tasks")
})

//calendar page browse/post/delete taks
app.get("/calendar", (req, res, next) => {
    res.send("tasks for this month")
})

app.post("/calendar/:day", (req, res, next) => {
    res.send("task added")
})

app.delete("/calendar/:day", (req, res, next) => {
    res.send("task deleted")
})

//get cookie data
app.get("/cookies/:cookieID", (req, res, next) => {
        res.send("This is the quote")
})

//cookies
app.get("/cookies", (req, res, next) => {
        res.send("Browse through cookies")
})

//browse through challlenges
app.get("/challenges", (req, res, next) => {
    res.send("challenges: ")
})

//post task in a challenge
app.post("/challenges/:id", (req, res, next) => {
    res.send("task added to a certain challenge")
})

app.delete("/challenges/:id", (req, res, next) => {
    res.send("task deleted from a cerain challenge")
})

// piggybank
app.get("/piggybank", (req, res, next) => {
        res.send("items you want to buy")
})

app.post("/piggybank", (req, res, next) => {
        res.send("item you added")
})

app.delete("/piggybank/:id", (req, res, next) => {
        res.send("items deleted")
})


//get signout information
app.get("/signout", (req, res, next) => {
    res.send("Signed out!")
})


//running server to test
hostname = "127.0.0.1"
port = 3000

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})