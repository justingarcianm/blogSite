const express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user")

router.get("/register", (req, res) => {
    res.render("register")
});

// Handle sign up logic
router.post("/register", (req, res) => {
    const newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/blog");
        })
    })
});

// Show Login Form
router.get("/login", (req, res) => {
    res.render("login")
});
// Handle login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/blog",
        failureRedirect: "/login"
    }), (req, res) => {
    })

// log out route
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/blog")
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

router.get('*', (req, res) => res.render("sorry"))

module.exports = router;