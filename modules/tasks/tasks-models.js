const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    task_id: {type: mongoose.Schema.Types.ObjectId},
    title: {type: String, required: true},
    dueDate: {type: mongoose.Schema.Types.Date},
    description: {type: String, default: []},
})

const TaskModel = new mongoose.model("Tasks", TaskSchema);

module.exports = TaskModel;