const express = require("express"),
    router = express.Router({ mergeParams: true }),
    Article = require("../models/article"),
    Comment = require("../models/comment")


// Comments post
router.post("/", (req, res) => {
    // look up blog using id
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
            res.redirect("/blog")
        } else {
            // create new comment
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err)
                } else {
                    // connect new comment to blog
                    article.comments.push(comment);
                    article.save();
                    // redirect to show page
                    res.redirect("/blog/" + article._id)
                }
            })
        }
    })
})


module.exports = router;