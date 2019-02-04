// =======================================================
//  SETUP
// =======================================================
const express = require("express"),
    app = express(),
    port = 3000,
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"))
mongoose.connect("mongodb://localhost:27017/story", { useNewUrlParser: true });

// SCHEMA SETUP

const articleSchema = new mongoose.Schema({
    author: String,
    image: String,
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

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

// Create Route - add new article to DB
app.post("/blog", (req, res) => {
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
    Article.findByIdAndUpdate(req.params.id, req.body.foundArticle, (err, updatedBlog) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/blog/" + req.params.id)
        }
    })
})

// Show Route - shows more info on one article
app.get('/blog/:id', (req, res) => {
    // find article with provided id
    Article.findById(req.params.id, (err, foundArticle) => {
        if (err) {
            console.log(err)
        } else {
            // render template with that article
            res.render("show", { foundArticle });
        }
    })
});

app.get('*', (req, res) => res.render("sorry"))

app.listen(port, () => console.log("go to http://localhost:3000/blog"))


mongoose.connection.once('open', () => console.log("connection has been made")).on('error', () => console.log("connection err", error))