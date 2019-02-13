var mongoose = require("mongoose");
var Article = require("./models/article");
var Comment = require("./models/comment");

var data = [
    {
        author: "unknown",
        image: "https://3.bp.blogspot.com/-PzZVpdgfyPc/Vxrnze4aMcI/AAAAAAAAAdI/mH9FBUbuP60XSxwsfDhoX0YDVgSpsvxpgCLcB/s1600/swgoh3.jpg",
        title: "Blog Post 1",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        author: "unknown",
        image: "https://3.bp.blogspot.com/-PzZVpdgfyPc/Vxrnze4aMcI/AAAAAAAAAdI/mH9FBUbuP60XSxwsfDhoX0YDVgSpsvxpgCLcB/s1600/swgoh3.jpg",
        title: "Blog Post 2",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        author: "unknown",
        image: "https://3.bp.blogspot.com/-PzZVpdgfyPc/Vxrnze4aMcI/AAAAAAAAAdI/mH9FBUbuP60XSxwsfDhoX0YDVgSpsvxpgCLcB/s1600/swgoh3.jpg",
        title: "Blog Post 3",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB() {
    //Remove all campgrounds
    Article.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed articles!");
        Comment.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("removed comments!");
            //add a few campgrounds
            data.forEach(function (seed) {
                Article.create(seed, function (err, article) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("added a article");
                        //create a comment
                        Comment.create(
                            {
                                content: "Great Read thank you!",
                                author: "Unknown"
                            }, function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    article.comments.push(comment);
                                    article.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;