const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation.js");

//define validation array for user creation in POST request

const createUserRules= [
    body("user_name")
        .isString()
        .isLength({min: 5})
        .not().isEmpty()
        .withMessage("User name is required"),
    body("first_name")
        .optional()
        .isString()
        .withMessage("Name must be a string"),
    body("last_name")
        .optional()
        .isString()
        .withMessage("Last name must be a string"),
    body("email")
        .isString()
        .not().isEmpty()
        .withMessage("Email is required")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .withMessage("Must be a valid email address"),
    body("password")
        .not().isEmpty()
        .isLength({min: 6})
        .withMessage("Password must be at least 6 characters long"),
    body("birthday_date")
        .custom((value) => {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                throw new Error("Date must be in YYYY-MM-DD format");
            };
            const date = new Date(value)
            if (isNaN(date.getTime())){
                throw new Error("Invalid date");
            }
            return true;
        }),
    checkValidation,
];

module.exports = createUserRules;
