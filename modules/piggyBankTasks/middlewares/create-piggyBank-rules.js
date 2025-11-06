const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation.js");

const createPiggyBankRules = [
    body("name")
        .not().isEmpty()
        .withMessage("Name must not be empty")
        .isLength({ max: 100 }),
    body("condition")
        .not().isEmpty()
        .withMessage("Condition must not be empty"),
    body("totalCount")
        .not().isEmpty()
        .withMessage("Total Count must be not empty")
        .isNumber(),
    body("image")
        .optional(),
    checkValidation,
];

module.exports = createPiggyBankRules;