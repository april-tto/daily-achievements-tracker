const { Router } = require("express");
const createPiggyBankRules = require("./middlewares/create-piggyBank-rules");
const updatePiggyBankRules = require("./middlewares/update-piggyBank-rules");

const PiggyBankModel = require("./piggyBankTasks-models");
const piggyBankRoute = Router();

//GET for retreival of Piggy Bank Tasks

piggyBankRoute.get("/piggybank", async (req,res,next) => {
    const allPBTasks = await PiggyBankModel.find();
    if (!allPBTasks) res.send([]);
    else res.send(allPBTasks);
})

//GET to retrieve Piggy Bank Tasks based on Task ID

piggyBankRoute.get("/piggybank/:id", async (req,res,next) => {
    const id = req.params.id;
    const pbtask = await PiggyBankModel.findById(id);
    if (!pbtask) res.status(404).send("Task was not found in the piggy bank");
    else res.send(pbtask);
})

//POST to upload a new Piggy Bank Tasks

piggyBankRoute.post("/piggybank",createPiggyBankRules, async (req,res,next) => {
    const { name, condition, total_count, completed_count, image } = req.body;
    const newPBTask = await PiggyBankModel.create(
        {
            name: name,
            condition: condition,
            total_count: total_count,
            completed_count: completed_count,
            image: image,
        }
    )
    if (!newPBTask) res.status(500).send("Server was not found");
    else res.send(newPBTask);
})

//PUT for updating the Piggy Bank Tasks

piggyBankRoute.put("/piggybank/:id", updatePiggyBankRules, async (req,res,next) => {
//
});

//DELETE for deleting the Piggy Bank Tasks
piggyBankRoute.delete("/piggybank/:id", async (req,res,next) => {
    const id = req.params.id;
    const pbtask = PiggyBankModel.findById(id);
    if (!pbtask) res.status(404).send("Task was not found in piggy bank");
    else {
        const deletedPBTask = await PiggyBankModel.findByIdAndDelete(id);
        if (!deletedPBTask) res.status(500).send("Server was not found");
        else res.send("Succesfully deleted task from piggy bank: " + deletedPBTask);
    }
})

module.exports = { piggyBankRoute };