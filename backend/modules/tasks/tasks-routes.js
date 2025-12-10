const { Router } = require("express");
const createTaskRules = require("./middlewares/create-tasks-rules");
const updateTaskRules = require("./middlewares/update-tasks-rules");

const TaskModel = require("./tasks-models");
const taskRoute = Router();
const UserModel = require("../users/users-models");
const { decodeToken } = require('../../shared/jwt-utils');

//POST for retreival of tasks based on token

taskRoute.post("/tasks", async (req, res, next) => {
    const { token } = req.body;
    const data = decodeToken(token);
    const user = await UserModel.findById(data.id);
    if (!user) return res.status(404).send("Could not find the user");

    const tasksId = user.taskId;
    const tasks = new Array();

    for (const task of tasksId) {
        const added_task = await TaskModel.findById(task);
        if (added_task) tasks.push(added_task);
        else res.status(404).send("Task was not found");
    }

    res.send(tasks);
})

//GET to retrieve tasks based on task ID

taskRoute.get("/tasks/:id", async (req, res, next) => {
    const id = req.params.id;
    const task = await TaskModel.findById(id);
    if (!task) res.status(404).send("Task was not found");
    else res.send(task);
})

//POST to upload a new task and assign it to a user
taskRoute.post("/tasks", createTaskRules, async (req, res, next) => {
    try {
        const { id, title, description, dueDate } = req.body;
        const newTask = await TaskModel.create(
            {
                title: title,
                description: description,
                dueDate: dueDate,
            }
        )
        if (!newTask) return res.status(500).send("Server was not found");

        const task = await TaskModel.findOne({ title: title, description: description, dueDate: dueDate })
        await UserModel.findByIdAndUpdate(
            id,
            { $addToSet: { taskId: task._id } }
        )
        res.send(task)

    } catch (err) {
        console.log("Error addinf a task", err.message);
        res.status(500).send("Server error");
    }
})

//PUT for updating the tasks

taskRoute.put("/tasks/:id", updateTaskRules, async (req, res, next) => {
    //
})

//DELETE for deleting the task
taskRoute.delete("/tasks/:id", async (req, res, next) => {
    const id = req.params.id;
    const task = TaskModel.findById(id);
    if (!task) res.status(404).send("Task was not found");
    else {
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        if (!deletedTask) res.status(500).send("Server was not found");
        else res.send("Succesfully deleted task: " + deletedTask);
    }
})

module.exports = { taskRoute };