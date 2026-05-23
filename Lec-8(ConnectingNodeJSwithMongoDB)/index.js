const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

// ======================
// MongoDB Connection
// ======================
mongoose.connect("mongodb://localhost:27017/youtubeTut")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log("MongoDB connection error:", err);
});

// ======================
// Schema
// ======================
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    ip_address: String
});

const User = mongoose.model("User", userSchema);

// ======================
// Middleware
// ======================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    console.log("Hello from middleware");
    req.myUserName = "ananyasharma_100";
    next();
});

app.use((req, res, next) => {
    console.log("Hello from second middleware");
    console.log(req.myUserName);
    next();
});

// ======================
// HTML Route
// ======================
app.get("/users", async (req, res) => {

    const allDbUsers = await User.find();

    const html = `
    <ul>
        ${allDbUsers.map(
            (user) => `<li>${user.first_name} ${user.last_name}</li>`
        ).join("")}
    </ul>
    `;

    return res.send(html);
});

// ======================
// GET ALL USERS
// ======================
app.get("/api/users", async (req, res) => {

    const allDbUsers = await User.find();

    return res.json(allDbUsers);
});

// ======================
// GET USER BY ID
// ======================
app.get("/api/users/:id", async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found"
        });
    }

    return res.json(user);
});

// ======================
// CREATE USER
// ======================
app.post("/api/users", async (req, res) => {

    const body = req.body;

    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email
    ) {
        return res.status(400).json({
            status: "error",
            message: "Invalid request body"
        });
    }

    const newUser = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        ip_address: body.ip_address
    });

    return res.status(201).json({
        status: "success",
        message: "User created successfully",
        user: newUser
    });
});

// ======================
// UPDATE USER
// ======================
app.patch("/api/users/:id", async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found"
        });
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    return res.json({
        status: "success",
        user: updatedUser
    });
});

// ======================
// DELETE USER
// ======================
app.delete("/api/users/:id", async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found"
        });
    }

    await User.findByIdAndDelete(req.params.id);

    return res.json({
        status: "success",
        message: "User deleted successfully"
    });
});

// ======================
// Server
// ======================
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});w