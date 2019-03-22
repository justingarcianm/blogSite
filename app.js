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
// Requiring Routes
const blogRoutes = require('./routes/blog'),
    commentRoutes = require('./routes/comment'),
    indexRoutes = require('./routes/index');
// seedDB();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(expressSanitizer());

const url = "mongodb+srv://user:12345@cluster0-j0f1n.mongodb.net/test?retryWrites=true" || "mongodb://localhost:27017/story"

mongoose.connect(url, { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost:27017/story", { useNewUrlParser: true });





// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "You've found me secret!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})


app.use("/blog", blogRoutes);
app.use("/blog/:id/comments", commentRoutes);
app.use(indexRoutes);

app.listen(port, () => console.log("go to http://localhost:3000/blog"))

