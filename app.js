const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');

app.set("view engine", "ejs");

// Add and format curent date 
var today = new Date();
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
var currentDate = today.toLocaleDateString("en-US", options);
app.get("/", (req, res) => {
    res.render("list", {
        currentDate
    })
});


app.listen(port, () => {
    console.log("App listens to port " + port);
})