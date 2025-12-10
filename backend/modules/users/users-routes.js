const { Router } = require("express");
const createUserRules = require("./middlewares/create-user-rules");
const updateUserRules = require("./middlewares/update-user-rules");

const UserModel = require("./users-models");
const userRoute = Router();

//imports for user validation
const { randomPassword } = require("../../shared/random-pass")
const OTPModel = require("./otp-model");
const { sendEmail } = require("../../shared/email-utils");
const { encodeToken, decodeToken } = require("../../shared/jwt-utils")

//GET for retreival of all users

userRoute.get("/user", async (req, res, next) => {
    const allUsers = await UserModel.find();
    if (!allUsers) res.send([]);
    else res.send(allUsers);
})

//GET to retrieve user based on user ID

userRoute.get("/user/:id", async (req, res, next) => {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (!user) res.status(404).send("User was not found");
    else res.send(user);
})

//POST to upload a new user

userRoute.post("/user", createUserRules, async (req, res, next) => {
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
    if (!newUser) return res.status(500).send("Server was not found");

    //generating OTP
    const OTP = randomPassword(5);
    const otpmodel = await OTPModel.create({ email: email, otp: OTP });
    const emailToUser = sendEmail(otpmodel, "Account Verification", "Your one-time-password");
    if (emailToUser) { return res.send({ message: "Account was created and verification email was succeessfuly sent!" }) }
    else { return res.send({ errorMessage: "Could not send verification email" }) };
})

//PUT for updating the user based in ID

userRoute.put("/user/:id", updateUserRules, async (req, res, next) => {
    //
});

//DELETE for deleting the user based on ID
userRoute.delete("/user/:id", async (req, res, next) => {
    const id = req.params.id;
    const user = UserModel.findById(id);
    if (!user) res.status(404).send("User was not found");
    else {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) res.status(500).send("Server was not found");
        else res.send("Succesfully deleted user: " + deletedUser);
    }
})

//LOGIN user route
userRoute.post("/user/login", async (req, res, next) => {
    //check if user exists
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
        return res.status(404).send({
            errorMessage: `User with ${email} does not exist`
        })
    }

    //check if password matches
    if (password != foundUser.password) {
        return res.status(404).send({
            errorMessage: "Password did not match"
        });
    }

    //generating OTP
    const OTP = randomPassword(5);
    const otpmodel = await OTPModel.create({ email: email, otp: OTP });
    const emailToUser = sendEmail(otpmodel, "Account Verification", "Your one-time-password");
    if (emailToUser) { return res.send({ message: "Verification email was succeessfuly sent!" }) }
    else { return res.send({ errorMessage: "Could not send verification email" }) };
})

//verify if provided OTP is correct
userRoute.post("/user/verify-login", async (req, res, next) => {
    const { email, otp } = req.body;

    const ifOTPfound = await OTPModel.findOne({ email: email, otp: String(otp) });

    if (!ifOTPfound) return res.send({ errorMessage: "Verification failed" });
    const foundUser = await UserModel.findOne({ email });
    const encodedToken = encodeToken({ id: foundUser._id, email: foundUser.email });
    res.cookie('access_token', encodedToken, { HttpOnly: true, secure: false, sameSite: 'lax', maxAge: 3600000 });
    res.json({ success: true, token: encodedToken })
})


//POST for LOGOUT
userRoute.post("/user/logout", async (req, res, next) => {
    console.log("Hit the route")
    try {
        const token = req.cookies.access_token;
        if (!token) return res.status(401).send("No token provided");
        
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });
        res.send({ message: "Logged out successfully!"})
    }
    catch (err) {
        console.log("Error signing out", err.message);
        res.status(500).send("Server error");
    }
})


module.exports = userRoute;