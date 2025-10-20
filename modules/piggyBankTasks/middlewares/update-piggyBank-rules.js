const { body } = require("express-validaotr");
const checkValidation = require("../../../shared/middlewares/check-validation.js");

const createPiggyBankRules = [
    body("name")
        .optional()
        .withMessage("Name must not be empty")
        .isLength({ max: 100 }),
    body("condition")
        .optional()
        .withMessage("Condition must not be empty"),
    body("totalCount")
        .optional()
        .withMessage("Total Count must be not empty")
        .isNumber(),
    body("image")
        .optional(),
    checkValidation,
];

module.exports = createPiggyBankRules;