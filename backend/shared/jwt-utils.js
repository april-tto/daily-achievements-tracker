const { verify } = require("jsonwebtoken");
const { sign } = require("jsonwebtoken");

const encodeToken = (payload) => {
    const secret = process.env.TOKEN_SECRET;
    return sign(payload, secret, { expiresIn: "1h" });
}


const decodeToken = (tkn) => {
    if (!tkn) return "No token was provided";
    const verification = verify(tkn, process.env.TOKEN_SECRET)
    return verification;
}

module.exports = { encodeToken, decodeToken };