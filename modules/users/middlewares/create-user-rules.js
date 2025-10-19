const { body } = require("express-validaotr");
const checkValidation = require("../../../shared/middlewares/check-validation.js");

//define validation array for user creation in POST request

const createUserRules= [
    body("")
]
