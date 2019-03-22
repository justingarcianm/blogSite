const express = require("express"),
    router = express.Router(),
    Article = require("../models/article")


// ROOT ROUTE
router.get('/', (req, res) => {
    // Get all articles from db
    Article.find({}, (err, allArticles) => {
        if (err) {
            console.log(err)
        } else {
            res.render("index", { allArticles })
        }
    })
});
// Shows all stories
router.get('/all', (req, res) => {
    Article.find({}, (err, allArticles) => {
        if (err) {
            console.log(err)
        } else {
            res.render("all", { allArticles })
        }
    })
})

// Create Route - add new article to DB
router.post("/", (req, res) => {

    // get data from form and add to newArticle array
    const author = req.body.author;
    const image = req.body.image;
    const title = req.body.title;
    const content = req.body.content;
    const newArticle = { author, image, title, content };
    // create a new article and save to database
    Article.create(newArticle, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            // redirect back to home page
            res.redirect("/blog");
        }
    })
})

// new Route - show form to create new article
router.get('/new', (req, res) => {
    res.render("newarticle", { currentUser: req.user })
})

// Edit Route
router.get('/:id/edit', (req, res) => {
    Article.findById(req.params.id, (err, foundArticle) => {
        if (err) {
            console.log(err)
        } else {
            // render template with that article
            res.render("edit", { foundArticle });
        }
    })
})

// Update Route
router.put('/:id', (req, res) => {
    req.body.foundArticle.content = req.sanitize(req.body.foundArticle.content)
    Article.findByIdAndUpdate(req.params.id, req.body.foundArticle, (err, updatedBlog) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/blog/" + req.params.id)
        }
    })
})

// Destroy Route
router.delete('/:id', (req, res) => {
    Article.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/blog")
        } else {
            res.redirect("/blog")
        }
    })
})

// Show Route - shows more info on one article
router.get('/:id', (req, res) => {
    // find article with provided id
    Article.findById(req.params.id).populate("comments").exec((err, foundArticle) => {
        if (err) {
            console.log(err)
        } else {
            // render template with that article
            res.render("show", { foundArticle });
        }
    })
});

module.exports = router;