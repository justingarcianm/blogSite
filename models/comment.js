const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    content: String,
    author: String
})

module.exports = mongoose.model("Comment", commentSchema)