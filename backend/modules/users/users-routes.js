const { Router } = require("express");
const createUserRules = require("./middlewares/create-user-rules");
const updateUserRules = require("./middlewares/update-user-rules");

const UserModel = require("./users-models");
const userRoute = Router();

//GET for retreival of all users

userRoute.get("/user", async (req,res,next) => {
    const allUsers = await UserModel.find();
    if (!allUsers) res.send([]);
    else res.send(allUsers);
})

//GET to retrieve user based on user ID

userRoute.get("/user/:id", async (req,res,next) => {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (!user) res.status(404).send("User was not found");
    else res.send(user);
})

//POST to upload a new user

userRoute.post("/user",createUserRules, async (req,res,next) => {
    const { user_name, first_name, last_name, email, password, birthday_date } = req.body;
    const newUser = await UserModel.create(
        {
            user_name: user_name,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            birthday_date: birthday_date,
        }
    )
    if (!newUser) res.status(500).send("Server was not found");
    else res.send(newUser);
})

//PUT for updating the user based in ID

userRoute.put("/user/:id", updateUserRules, async (req,res,next) => {
//
});

//DELETE for deleting the user based on ID
userRoute.delete("/user/:id", async (req,res,next) => {
    const id = req.params.id;
    const user = UserModel.findById(id);
    if (!user) res.status(404).send("User was not found");
    else {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) res.status(500).send("Server was not found");
        else res.send("Succesfully deleted user: " + deletedUser);
    }
})

module.exports = { userRoute };