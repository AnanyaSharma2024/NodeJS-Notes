const express = require('express');
const connectDB = require('./connect');
const URL = require('./models/url');
const URLRoute = require('./routes/url');
const app = express();
const PORT = 3000;

// Connect to MongoDB before starting server
connectDB();
app.use(express.json());

app.use("/url", URLRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const urlData = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: new Date() } } },
        { new: true }
    );
    if (!urlData) {
        return res.status(404).json({ error: 'URL not found' });
    }
    res.redirect(urlData.redirectURL);
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});