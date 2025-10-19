const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId},
    user_name: {type: String, require: true},
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String, require: true},
    password: {type: String, require: true, minLength: 8},
    birthday_date: {type: mongoose.Schema.Types.Date, required: true},
    collectedCookiesId: {type: mongoose.Schema.Types.ObjectId, ref: 'Cookie'},
    taskId: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
    piggyBankId: {type: mongoose.Schema.Types.ObjectId, ref: 'BankTask'},
})

const UserModel = new mongoose.model("User", UserSchema);

module.exports = UserModel;