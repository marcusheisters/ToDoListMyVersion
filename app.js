const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// Init Itemlist
let items = ["Cook", "Eat", "Play"];
let workItems = [];

var currentDate = getCurrentDate();

app.listen(port, () => {
    console.log("App listens to port " + port);
});
processingHomeRoute();
processingWorkRoute();


// defaukt route
function processingHomeRoute() {
    app.get("/", (_req, res) => {
        currentDate = getCurrentDate();
        // Render the list
        res.render("list", { listTitle: currentDate, items: items });
    });

    // Add item to list and rerender updated list
    app.post("/", (req, res) => {
        let item = req.body.listItem;

        if (req.body.list === "Work") {
            workItems.push(item);
            res.redirect("/work");
        } else {
            items.push(req.body.listItem);
            res.redirect("/");
        }
    });
}

// /Work route
function processingWorkRoute() {
    app.get("/work", (req, res) => {
        res.render("list", { listTitle: "Work", items: workItems });
    });
        
    app.post("/work", (req, res) => {
        items.push(req.body.listItem);
        res.redirect("/work");
    });
}

function getCurrentDate() {
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var currentDate = today.toLocaleDateString("en-US", options);
    return currentDate;
}
