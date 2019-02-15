// =======================================================
//  SETUP
// =======================================================
const express = require("express"),
    app = express(),
    port = 3000,
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    Article = require("./models/article"),
    Comment = require("./models/comment"),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    User = require('./models/user'),
    seedDB = require("./seeds")


// seedDB();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(expressSanitizer());
mongoose.connect("mongodb://localhost:27017/story", { useNewUrlParser: true });

// =======================================================
//  ROUTES
// =======================================================

// Index Route - show all storys
app.get('/blog', (req, res) => {
    // Get all articles from db
    Article.find({}, (err, allArticles) => {
        if (err) {
            console.log(err)
        } else {
            res.render("index", { allArticles })
        }
    })
});

app.get('/blog/all', (req, res) => {
    Article.find({}, (err, allArticles) => {
        if (err) {
            console.log(err)
        } else {
            res.render("all", { allArticles })
        }
    })
})

// Create Route - add new article to DB
app.post("/blog", (req, res) => {
    // get data from form and add to newArticle array
    req.body.foundArticle.content = req.sanitize(req.body.foundArticle.content)
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
app.get('/blog/new', (req, res) => {
    res.render("newarticle")
})

// Edit Route
app.get('/blog/:id/edit', (req, res) => {
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
app.put('/blog/:id', (req, res) => {
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
app.delete('/blog/:id', (req, res) => {
    Article.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/blog")
        } else {
            res.redirect("/blog")
        }
    })
})

// Show Route - shows more info on one article
app.get('/blog/:id', (req, res) => {
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


// =============================
// COMMENTS ROUTE
// =============================

app.get("/blog/:id/comments/new", (req, res) => res.send("new comment"))


app.post("/blog/:id/comments", (req, res) => {
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

app.get('*', (req, res) => res.render("sorry"))

app.listen(port, () => console.log("go to http://localhost:3000/blog"))


mongoose.connection.once('open', () => console.log("connection has been made")).on('error', () => console.log("connection err", error))