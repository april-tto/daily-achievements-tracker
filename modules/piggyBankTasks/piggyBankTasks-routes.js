// piggybank
app.get("/piggybank", (req, res, next) => {
        res.send("items you want to buy")
})

app.post("/piggybank", (req, res, next) => {
        res.send("item you added")
})

app.delete("/piggybank/:id", (req, res, next) => {
        res.send("items deleted")
})