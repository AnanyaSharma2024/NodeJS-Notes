const express = require('express');
const path = require('path');
const connectDB = require('./connect');
const URL = require('./models/url');
const URLRoute = require('./routes/url');
const app = express();
const PORT = 3000;

// Connect to MongoDB before starting server
connectDB();
// Set EJS as the view engine and specify the views directory
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function renderHome(req, res) {
    try {
        const allURLs = await URL.find().lean();
        const createdShortId = req.query.createdShortId || null;
        const createdUrl = createdShortId ? allURLs.find(url => url.shortId === createdShortId) : null;
        const error = req.query.error || null;
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        res.render('home', {
            allURLs,
            error,
            createdUrl,
            baseUrl,
        });
    } catch (error) {
        console.error('Failed to load URLs:', error);
        res.render('home', {
            allURLs: [],
            error: 'Server error. Please try again later.',
            createdUrl: null,
            baseUrl: `${req.protocol}://${req.get('host')}`,
        });
    }
}

app.get('/', renderHome);
app.get('/test', renderHome);

app.use('/url', URLRoute);

app.get("/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const urlData = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: new Date() } } },
            { new: true }
        );
        if (!urlData) {
            return res.status(404).render('home', { allURLs: [], error: 'Short URL not found.' });
        }
        res.redirect(urlData.redirectURL);
    } catch (error) {
        console.error('Redirect failed:', error);
        res.status(500).render('home', { allURLs: [], error: 'Server error while redirecting.' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});