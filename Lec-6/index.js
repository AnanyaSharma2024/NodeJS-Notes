const http = require('http');
const express = require('express');

const app = express();

app.get("/", (req, res) => {
    return res.send("home page");
});

app.get("/about", (req, res) => {
    return res.send("about page" + " hey " + req.query.name);
});

app.listen(8000, () => {
    console.log("server is running on port 8000");
});