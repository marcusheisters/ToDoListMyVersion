const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// Init Itemlist
const items = ["Cook", "Eat", "Play"];
const workItems = [];

app.listen(port, () => {
    console.log("App listens to port " + port);
});

processingHomeRoute();
processingWorkRoute();
processingAboutRoute();

// defaukt route
function processingHomeRoute() {
    app.get("/", (_req, res) => {
        // Render the list
        res.render("list", { listTitle: date.getDay(), items: items });
    });

    // Add item to list and rerender updated list
    app.post("/", (req, res) => {
        const item = req.body.listItem;

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

// /about route
function processingAboutRoute() {
    app.get("/about", (req, res) => {
        res.render("about");
    });
}

