const mongoose = require("mongoose");

const FortuneCookieSchema = new mongoose.Schema({
    cookie_id: {type: mongoose.Schema.Types.ObjectId},
    quote: {type: String},
    author: {type: String},
    rank: {type: String, required: true}
})

const CookieModel = new mongoose.model("FortuneCookie", FortuneCookieSchema);