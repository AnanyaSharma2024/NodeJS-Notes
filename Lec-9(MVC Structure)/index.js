const express = require('express');
const connectToMongoDB = require('./connection');
const {logReqRes} = require('./middlewares');
const User = require('./models/user');
const userRoutes = require('./routes/user');
const app = express();
const PORT = 8000;

// ======================
// MongoDB Connection
// ======================
connectToMongoDB("mongodb://localhost:27017/userdb")
.then(() => console.log("MongoDB Connected"));

// ======================
// Middleware
// ======================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logReqRes("logs.txt"));

// ======================
// Routes isme humne user ke sare routes ko alag file me daal diya hai taki code zyada organized rahe aur maintain karna easy ho jaye 
// ======================
app.use("/api/user", userRoutes);
// ======================
// Server
// ======================
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});