const mongoose = require('mongoose');
//SCHEMA 
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [
        {
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
});


const url = mongoose.model('URL', urlSchema);
module.exports = url;