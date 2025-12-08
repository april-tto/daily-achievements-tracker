const { validationResult } = require("express-validator");

function checkValidation(req,res,next){
    const errs = validationResult(req);
    if (!errs.isEmpty()){
        return res.status(400).send("Bad Request!");
    }
    next();
}

module.exports = checkValidation;