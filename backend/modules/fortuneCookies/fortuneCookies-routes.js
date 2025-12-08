const Router = require("express");
const FortuneCookieModel = require("./fortuneCookies-models");
const UserModel = require("../users/users-models");

const fortuneCookieRoute = Router();

//POST for receiving a random cookie and saving it into user's collected cookies

fortuneCookieRoute.post("/random-fortuneCookie", async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(404).send("ID was not provided");
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).send("User was not found");
        //gets an array with only one value - a cookie that a user dont have

        const collectedCookies = Array.isArray(user.collectedCookiesId)
            ? user.collectedCookiesId.map(id => mongoose.Types.ObjectId(id))
            : [];

        console.log("User collectedCookiesId:", user.collectedCookiesId);
        console.log("Is array?", Array.isArray(user.collectedCookiesId));
        console.log("Mapped ObjectIds:", user.collectedCookiesId?.map(id => mongoose.Types.ObjectId(id)));


        const randomCookies = await FortuneCookieModel.aggregate([
            { $match: { _id: { $nin: collectedCookies } } },
            { $sample: { size: 1 } }
        ]);
        //dont know how to deal with this for now
        if (!randomCookies.length) return res.status(404).send("No new cookie available");

        const toBeAdded = randomCookies[0];
        //add id of this cookie to user's collected cookies
        await UserModel.findByIdAndUpdate(
            id,
            { $addToSet: { collectedCookiesId: toBeAdded._id } }
        );
        res.send(toBeAdded)
    }
    catch (err) {
        console.log("Error fetching a cookie", err.message);
        res.status(500).send("Server error");
    }
})

//POST for getting all user's fortune cookies
fortuneCookieRoute.post("/fortune-cookies", async (req, res, next) => {
    const { id } = req.body;
    console.log("Body", req.body);
    const user = await UserModel.findById(id)
    if (!user) res.status(404).send("User was not found!");
    else {
        const cookiesId = user.collectedCookiesId;
        const cookies = new Array();
        console.log("collectedCookiesId =", user.collectedCookiesId);
        console.log("Type =", typeof user.collectedCookiesId);

        for (const piece of cookiesId) {
            const cookie = await FortuneCookieModel.findById(piece);
            if (cookie) cookies.push(cookie);
            else res.status(404).send("Cookie was not found");
        }
        res.send(cookies);
    }
})

module.exports = { fortuneCookieRoute };