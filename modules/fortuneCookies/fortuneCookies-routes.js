const Router = require("express");
const FortuneCookieModel = require("./fortuneCookies-models");

const fortuneCookieRoute = Router();

//GET for receiving a random cookie

fortuneCookieRoute.get("/random-fortuneCookie", async (req, res, next) => {
    const randomCookie = await FortuneCookieModel.aggregate([{ $sample: {size: 1}}]);
    if (!randomCookie) res.status(404).send("Cookie was not found!");
    else res.send(randomCookie);
})

module.exports = { fortuneCookieRoute };