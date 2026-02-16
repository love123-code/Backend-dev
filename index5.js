const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const filePath = path.join(__dirname, "students.json");

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
}

function readStudents() {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeStudents(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/students/register", (req, res) => {
    const { name, branch } = req.body;

    const students = readStudents();

    let newId = 1;
    if (students.length > 0) {
        newId = students[students.length - 1].id + 1;
    }

    const newStudent = {
        id: newId,
        name,
        branch
    };

    students.push(newStudent);
    writeStudents(students);

    res.redirect("/students");
});

app.get("/students", (req, res) => {
    let students = readStudents();
    const { branch } = req.query;

    if (branch) {
        students = students.filter(s =>
            s.branch.toLowerCase() === branch.toLowerCase()
        );
    }

    res.render("students", {
        students,
        total: students.length
    });
});

app.get("/students/delete/:id", (req, res) => {
    const id = Number(req.params.id);

    let students = readStudents();
    students = students.filter(s => s.id !== id);

    writeStudents(students);

    res.redirect("/students");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});