const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation.js");

const createPiggyBankRules = [
    body("name")
        .isLength({ max: 100 })
        .not().isEmpty()
        .withMessage("Name must not be empty"),
    body("condition")
        .not().isEmpty()
        .withMessage("Condition must not be empty"),
    body("totalCount")
        .not().isEmpty()
        .withMessage("Total Count must be not empty")
        .isNumeric(),
    body("image")
        .optional(),
    checkValidation,
];

module.exports = createPiggyBankRules;