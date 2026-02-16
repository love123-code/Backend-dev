const express = require("express");
const router = express.Router();

const users = [
    { name: "Love" },
    { name: "Rahul" },
    { name: "Amit" }
];

// example: /users?name=Love
router.get("/", (req, res) => {

    const name = req.query.name;

    if (name) {
        const filtered = users.filter(user =>
            user.name.toLowerCase() === name.toLowerCase()
        );
        res.json(filtered);
    } else {
        res.json(users);
    }
});

module.exports = router;
