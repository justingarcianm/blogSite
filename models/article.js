const mongoose = require("mongoose")
// SCHEMA SETUP

const articleSchema = new mongoose.Schema({
    author: String,
    image: String,
    title: String,
    content: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Article", articleSchema);