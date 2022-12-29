// App stuff
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const port = 3000;

// DB and mongoose
const db = mongoose.connect('mongodb://localhost:27017/toDoListDB');

// Schemas
// Items
const itemsSchema = { name: String };
const Item = mongoose.model("Item", itemsSchema);

// Lists
const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

// Default Items for empty lists
const item1 = new Item({ name: "Welcome to your ToDo List" });
const item2 = new Item({ name: "Hit the '+' button to add new items" });
const item3 = new Item({ name: "Use the checkbox to mark items" });
const defaultItems = [item1, item2, item3];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(port, () => {
    console.log("App listens to port " + port);
});

processHomeRoute();
processCustomRoute();
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
        const listName = req.body.list;
        const item = new Item({ name: itemName });

        // Default route?
        if (listName === "Today") {
            item.save();
            res.redirect("/");
        } else {
            List.findOne({name: listName}, (err, foundList) => {
                foundList.items.push(item);
                foundList.save();
                res.redirect(`/${listName}`);
            });
        }
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
function processCustomRoute() {
    app.get("/:customListItem", (req, res) => {
        const customListName = req.params.customListItem;
        List.findOne({ name: customListName }, (err, foundList) => {
            if (!err) {
                // Create new List if not existing
                if (!foundList) {
                    const list = new List({
                        name: customListName,
                        items: defaultItems
                    });
                    list.save();
                    res.redirect("/" + customListName);

                }
                // Use existing list from DB
                else {
                    res.render("list", {
                        listTitle: foundList.name,
                        items: foundList.items
                    });
                }
            }
        });


    });

}

// /about route
function processAboutRoute() {
    app.get("/about", (req, res) => {
        res.render("about");
    });
}

