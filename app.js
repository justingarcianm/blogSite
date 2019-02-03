// =======================================================
//  SETUP
// =======================================================
const express = require("express"),
    app = express(),
    port = 3000,
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/story");

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
app.get('/', (req, res) => {
    // Get all articles from db
    Article.find({}, (err, allArticles) => {
        if (err) {
            console.log(err)
        } else {
            res.render("home", { allArticles })
        }
    })
});

app.post("/", (req, res) => {
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
            res.redirect("/");
        }
    })
})

app.get('/article/new', (req, res) => {
    res.render("newarticle")
})

app.get('*', (req, res) => res.render("sorry"))

app.listen(port, () => console.log("go to http://localhost:3000/"))


mongoose.connection.once('open', () => console.log("connection has been made")).on('error', () => console.log("connection err", error))