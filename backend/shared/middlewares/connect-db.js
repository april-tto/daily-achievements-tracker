const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;

function connectDB(req, res, next){
    try{
        mongoose.connect(dbUrl, {dbName: "TaskTrackerAppDB"});
        console.log("Database is connected");
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send("Cannot connect the database");
    }
}

module.exports = connectDB;