const express = require("express");

const app = express();
const PORT = 8000;

app.get("/users", (req, res) => {
    res.send("<h1>Welcome to home page</h1>");
});

app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`You are requesting for user: ${userId}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});