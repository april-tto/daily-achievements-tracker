//calendar page browse/post/delete taks
app.get("/calendar", (req, res, next) => {
    res.send("tasks for this month")
})

app.post("/calendar/:day", (req, res, next) => {
    res.send("task added")
})

app.delete("/calendar/:day", (req, res, next) => {
    res.send("task deleted")
})

//get cookie data
app.get("/cookies/:cookieID", (req, res, next) => {
        res.send("This is the quote")
})

