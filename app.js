const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Init Itemlist
var items = ["Cook", "Eat", "Play"];
// Add and format curent date 
var today = new Date();
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var currentDate = today.toLocaleDateString("en-US", options);

app.get("/", (req, res) => {

    // Render the new list
    res.render("list", {
        currentDate, items
    })
});

app.post("/", (req, res) => {
    // Add item to existing list
    items.push(req.body.listItem);
    
    // Render the new list
        res.render("list", {
            currentDate, items
        })
})


app.listen(port, () => {
    console.log("App listens to port " + port);
})