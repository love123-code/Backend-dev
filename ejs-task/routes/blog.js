const express = require("express");
const router = express.Router();

let posts = [
    { id: 1, title: "First Post", content: "Hello world" },
    { id: 2, title: "Second Post", content: "Learning Express" }
];

// list posts
router.get("/", (req, res) => {
    res.render("blog", { posts });
});

// new post form
router.get("/new", (req, res) => {
    res.render("newpost");
});

// create post
router.post("/", (req, res) => {

    const { title, content } = req.body;

    const newPost = {
        id: posts.length + 1,
        title,
        content
    };

    posts.push(newPost);

    res.redirect("/blog");
});

// view single post
router.get("/:id", (req, res) => {

    const post = posts.find(p => p.id == req.params.id);

    res.render("post", { post });
});

module.exports = router;
