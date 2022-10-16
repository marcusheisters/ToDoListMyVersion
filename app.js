const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Init Itemlist
var items = ["Cook", "Eat", "Play"];

var currentDate = getCurrentDate();

// Render the first page view 
app.get("/", (_req, res) => {
        currentDate = getCurrentDate();
        // Render the list
        res.render("list", {
            currentDate, items
        });
    });

// Add item to list and rerender updated list
app.post("/", (req, res) => {
    // Add item to existing list
    items.push(req.body.listItem);
    
        res.render("list", {
            currentDate, items
        })
})


app.listen(port, () => {
    console.log("App listens to port " + port);
})

function getCurrentDate() {
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var currentDate = today.toLocaleDateString("en-US", options);
    return currentDate;
}
