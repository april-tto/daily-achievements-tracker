const { body } = require("express-validator");
const checkValidation = require("../../../shared/middlewares/check-validation.js");

const createPiggyBankRules = [
    body("name")
        .optional()
        .isLength({ max: 100 }),
    body("condition")
        .optional(),
    body("totalCount")
        .optional()
        .isNumeric(),
    body("image")
        .optional(),
    checkValidation,
];

module.exports = createPiggyBankRules;