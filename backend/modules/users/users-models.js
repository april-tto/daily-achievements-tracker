const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, immutable: true},
    user_name: {type: String, required: true},
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true, minLength: 8},
    birthday_date: {type: mongoose.Schema.Types.Date, required: true, immutable: true},
    collectedCookiesId: {type: [mongoose.Schema.Types.ObjectId], ref: 'Cookie', default: []},
    taskId: {type: [mongoose.Schema.Types.ObjectId], ref: 'Task', default: []},
    piggyBankId: {type: [mongoose.Schema.Types.ObjectId], ref: 'BankTask', default: []},
})

const UserModel = new mongoose.model("Users", UserSchema);

module.exports = UserModel;