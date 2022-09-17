const express = require('express');
const app = express(); 
const port = 3000;
const ejs = require('ejs');

app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("list");
});


app.listen(port, () => {
    console.log("App listens to port " + port);
})