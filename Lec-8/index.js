const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const users = require('./MOCK_DATA.json');
const app = express();
const PORT = 8000;

//connecting to mongodb
mongoose.connect("mongodb://localhost:27017/youtubeTut").then(() => {
    console.log("connected to mongodb");
}).catch((err) => {
    console.log("error connecting to mongodb", err);
});

//SCHEMA
const userSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    ip_address: String
});

const User = mongoose.model('User', userSchema);




//middleware
//yeh middleware hai, jo har request ke sath chalta hai, aur usme se data ko parse krke req.body me store kr deta hai
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    console.log("hello from middleware");
    req.myUserName = "ananyasharma_100"
    next();
});

app.use((req, res, next) => {
    console.log("hello from second middleware");
    console.log(req.myUserName);
    next();
});

//yeh web wla jo user use karta hai, uske liye hota hai
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
    </ul>
    `
    return res.send(html);
});


// REST API ROUTES

//yeh api wla jo developer use karta hai, uske liye hota hai
app.get("/api/users", (req, res) => {
    return res.json(users);
});

//Dynamic variable :id is a variable part of the URL that can be accessed in the route handler using req.params.id. This allows you to create routes that can handle different user IDs dynamically.
app.get("/api/users/:id", (req, res) => {
    //id ko get kr rhe h url se, kyuki url me :id likha hai, toh usme jo bhi value aayegi wo id me store ho jayegi
    const id = Number(req.params.id);
    //find kr rhe h 
    const user = users.find((user) => user.id === id);
    if (!user) { return res.status(404).json({ status: "error", message: "User not found" }); } 
    return res.json(user);
});

app.post("/api/users", async (req, res) => {
    const body = req.body;
    //validation kr do, ki body me first_name, last_name, email hai ya nahi, agar nahi hai toh 400 error return kr do
    if(!body || !body.first_name || !body.last_name || !body.email){
        return res.status(400).json({ status: "error", message: "Invalid request body" });
    }
    //users array me new user ko add kr do, aur uske baad file me changes ko save kr do
    await User.create(
        {
            id: users.length + 1,//id ko auto increment kr do, users array me jitne users hai uske length se 1 add kr do, toh new user ka id mil jayega
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            gender: body.gender
        });
        console.log("result" + result);
        //users.push({ id: users.length + 1, ...body });
        return res.json({ status: "success", message: "User created successfully" });
});

app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }
    users[index] = { ...users[index], ...req.body, id };//update kr do user ko, jo bhi changes aaye hai req.body me, unko update kr do, aur id ko bhi maintain kr do
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));//file me changes ko save kr do
    return res.json({ status: "success", user: users[index] });
});

app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);//id ko get kr rhe h url se, kyuki url me :id likha hai, toh usme jo bhi value aayegi wo id me store ho jayegi
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {//agar user nahi milta hai, toh 404 error return kr do
        return res.status(404).json({ status: "error", message: "User not found" });
    }
    users.splice(index, 1);//splice krke user ko delete kr do
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));//file me changes ko save kr do
    return res.json({ status: "success", id });
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});