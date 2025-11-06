const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation.js");

//define validation array for user creation in POST request

const updateUserRules= [
    body("user_name")
        .optional()
        .isString()
        .isLength({min: 5})
        .not().isEmpty(),
    body("first_name")
        .optional()
        .isString(),
    body("last_name")
        .optional()
        .isString(),
    body("email")
        .optional()
        .isString()
        .not().isEmpty()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .withMessage("Must be a valid email address"),
    body("password")
        .optional()
        .not().isEmpty()
        .isLength({min: 6}),
    body("birthday_date")
        .custom((value) => {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                throw new Error("Date must be in YYYY-MM-DD format");
            };
            const date = newDate(value)
            if (isNaN(date.getTime())){
                throw new Error("Invalid date");
            }
            return true;
        }),
    body("collectedCookiesId")
        .optional(),
    body("taskId")
        .optional(),
    body("piggyBankId")
        .optional(),
    checkValidation,
];

module.exports = updateUserRules;