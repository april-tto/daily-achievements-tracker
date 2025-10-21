const { Router } = require("express");
const createTaskRules = require("./middlewares/create-tasks-rules");
const updateTaskRules = require("./middlewares/update-tasks-rules");

const TaskModel = require("./tasks-models");
const taskRoute = Router();

//GET for retreival of tasks

taskRoute.get("/tasks", async (req,res,next) => {
    const allTasks = await TaskModel.find();
    if (!allTasks) res.send([]);
    else res.send(allTasks);
})

//GET to retrieve tasks based on task ID

taskRoute.get("/tasks/:id", async (req,res,next) => {
    const id = req.params.id;
    const task = await TaskModel.findById(id);
    if (!task) res.status(404).send("Task was not found");
    else res.send(task);
})



//POST to upload a new task

taskRoute.post("/tasks",createTaskRules, async (req,res,next) => {
    const { title, description, dueDate } = req.body;
    const newTask = await TaskModel.create(
        {
            title: title,
            description: description,
            dueDate: dueDate,
        }
    )
    if (!newTask) res.status(500).send("Server was not found");
    else res.send(newTask);
})

//PUT for updating the tasks

taskRoute.put("/tasks/:id", updateTaskRules, async (req,res,next) => {
//
})

//DELETE for deleting the task
taskRoute.delete("/tasks/:id", async (req,res,next) => {
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