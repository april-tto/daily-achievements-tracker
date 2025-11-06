const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation.js");

const updateTaskRules = [
    body("title")
        .optional()
        .withMessage("Title must not be empty")
        .isLength({ max: 100 }),
    body("description")
        .optional()
        .withMessage("Description must not be empty"),
    body("dueDate")
        .optional()
        .custom((value) => {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                throw new Error("Date must be in YYYY-MM-DD format");
            };
            const date = newDate(value)
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date");
            }
            return true;
        }),
    checkValidation,
];

module.exports = updateTaskRules;