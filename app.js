const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const port = 3000;

const db = mongoose.connect('mongodb://localhost:27017/toDoListDB');

const itemsSchema = { name: String };
const Item = mongoose.model("Item", itemsSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// Add some default items
const item1 = new Item({ name: "Welcome to your ToDo List" });
const item2 = new Item({ name: "Hit the '+' button to add new items" });
const item3 = new Item({ name: "Use the checkbox to mark items" })

const defaultItems = [item1, item2, item3];


app.listen(port, () => {
    console.log("App listens to port " + port);
});

processHomeRoute();
processWorkRoute();
processAboutRoute();

// defaukt route
function processHomeRoute() {
    app.get("/", (_req, res) => {

        Item.find({}, (err, items) => {

            // init DB with items if its empty
            if (items.length === 0) {
                Item.insertMany(defaultItems, (err, docs) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Items inserted: ${docs}`);
                    }
                })

                res.redirect("/");
            }
            res.render("list", { listTitle: "Today", items: items });
        })
        // Render the list
    });

    // Add item to list and rerender updated list
    app.post("/", (req, res) => {
        const itemName = req.body.listItem;
        const item = new Item({name: itemName});
        item.save();
        res.redirect("/");
    });

    // Route for deleting items
    app.post("/delete", (req, res) => {
        const checkedItemId = req.body.checkbox;
        

        Item.findByIdAndRemove(checkedItemId, (err) => {
            console.log("Item with id " + checkedItemId + " removed");
        });
        res.redirect("/");
    });
}

// /Work route
function processWorkRoute() {
    app.get("/lists/:list", (req, res) => {
        console.log(req.params.list);
        res.redirect("/");
    });

    app.post("/work", (req, res) => {
        items.push(req.body.listItem);
        res.redirect("/work");
    });
}

// /about route
function processAboutRoute() {
    app.get("/about", (req, res) => {
        res.render("about");
    });
}

