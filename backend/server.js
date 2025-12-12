require('dotenv').config();
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const connectDB = require("./shared/middlewares/connect-db.js");

//importing module routes
const taskRoute  = require("./modules/tasks/tasks-routes.js");
const userRoute = require("./modules/users/users-routes.js");
const piggyBankRoute  = require("./modules/piggyBankTasks/piggyBankTasks-routes.js");
const fortuneCookieRoute = require("./modules/fortuneCookies/fortuneCookies-routes.js");

const app = express()

//application-level middleware
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//connect DB
app.use(connectDB);

//mounting routes
app.use(taskRoute);
app.use(userRoute);
app.use(piggyBankRoute);
app.use(fortuneCookieRoute);

app.use((req,res) => {
    res.status(404).send(`Error! ${req.method} ${req.path} was not found`)
})

app.use((err,req,res,next) => {
    console.log(err);
    res.status(500).send("Oops! Internal server error");
})

//running server to test
const hostname = "0.0.0.0"
const port = 3000

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})