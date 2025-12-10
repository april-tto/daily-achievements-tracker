const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation.js");

const createTaskRules = [
    body("title")
        .not().isEmpty()
        .withMessage("Title must not be empty")
        .isLength({ max: 100 }),
    body("description")
        .not().isEmpty()
        .withMessage("Description must not be empty"),
    body("dueDate")
        .optional({ checkFalsy: true })
        .custom((value) => {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                throw new Error("Date must be in YYYY-MM-DD format");
            };
            const date = new Date(value)
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date");
            }
            return true;
        }),
    checkValidation,
];

module.exports = createTaskRules;