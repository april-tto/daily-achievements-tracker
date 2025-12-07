const mongoose = require("mongoose");

const PiggyBankTaskSchema = new mongoose.Schema({
    piggy_bank_id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: true},
    condition: {type: String, required: true},
    total_count: {type: Number, required: true},
    completed_count: {type: Number, default: 0},
    image: {data: Buffer, contentType: String}
})

const PiggyBankModel = new mongoose.model("Piggy_banks", PiggyBankTaskSchema);

module.exports = PiggyBankModel;