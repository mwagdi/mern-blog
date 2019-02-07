const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    top: {
        type: Schema.Types.ObjectId,
        ref: 'media'
    },
    slug: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model("posts",PostSchema);