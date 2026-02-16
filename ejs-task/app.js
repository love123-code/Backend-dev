const express = require("express");
const path = require("path");

const userRoutes = require("./routes/users");
const contactRoutes = require("./routes/contact");
const blogRoutes = require("./routes/blog");

const responseTimeLogger = require("./middleware/responseTimeLogger");

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(responseTimeLogger);

// static files
app.use(express.static(path.join(__dirname, "public")));

// view engine
app.set("view engine", "ejs");

// routes
app.use("/users", userRoutes);
app.use("/contact", contactRoutes);
app.use("/blog", blogRoutes);

// gallery route
app.get("/gallery", (req, res) => {
    const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
    res.render("gallery", { images });
});

// home
app.get("/", (req, res) => {
    res.render("index");
});

// custom 404
app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
