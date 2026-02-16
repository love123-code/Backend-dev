const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("contact");
});

router.post("/", (req, res) => {

    const { name, email, message } = req.body;

    console.log(name, email, message);

    res.render("success", { name });
});

module.exports = router;
