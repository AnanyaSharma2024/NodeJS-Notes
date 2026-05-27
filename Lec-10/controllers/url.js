const { nanoid } = require('nanoid');
const URL = require('../models/url');
async function generateShortUrl(req, res) {
    const body = req.body;
    const redirectURL = body.redirectURL || body.url;
    if (!redirectURL) {
        if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return res.status(400).redirect('/?error=URL%20is%20required');
        }
        return res.status(400).json({ error: 'URL is required' });
    }

    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL,
        visitHistory: []
    });

    if (req.headers.accept && req.headers.accept.includes('text/html')) {
        return res.redirect(`/?createdShortId=${encodeURIComponent(shortID)}`);
    }

    res.json({
        shortId: shortID,
        longUrl: redirectURL,
        shortUrl: `${req.protocol}://${req.get('host')}/${shortID}`
    });
}

module.exports = {
    generateShortUrl
}