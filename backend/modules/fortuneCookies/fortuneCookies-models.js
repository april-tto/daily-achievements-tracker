const mongoose = require("mongoose");

const FortuneCookieSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    Quote: {type: String},
    Author: {type: String},
    Tags: {type: [String], default: [] },
    popularity: {type: Number},
    category: {type: String},
})

const CookieModel = new mongoose.model("Fortune_cookies", FortuneCookieSchema);
module.exports = CookieModel;