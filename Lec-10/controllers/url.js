const { nanoid } = require('nanoid');
const URL = require('../models/url');
async function generateShortUrl(req, res) {
    const body = req.body;
    if(!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    });
    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortID}` });
}

module.exports = {
    generateShortUrl
}