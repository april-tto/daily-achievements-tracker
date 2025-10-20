
//login page
app.get("/login", (req, res, next) => {
    res.send("logged in!")
})

//home page
app.get("/home", (req, res, next) => {
        res.send("todays tasks")
})

//get signout information
app.get("/signout", (req, res, next) => {
    res.send("Signed out!")
})