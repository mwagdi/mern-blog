const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
    src: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Media = mongoose.model("media",MediaSchema);