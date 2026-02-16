const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let users = [];
let idCounter = 1;


app.get("/", (req, res) => {
    res.render("form", { users });   
});

app.post("/students/register", (req, res) => {
    const { name, branch } = req.body;

    const newUser = {
        id: idCounter++,
        name,
    
        branch
    };

    users.push(newUser);

    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});