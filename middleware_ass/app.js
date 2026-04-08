const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 300000 } // 5 min session
}));

app.use((req, res, next) => {
  req.lang = req.cookies.lang || "en";
  next();
});

app.use("/auth", require("./routes/auth"));
app.use("/form", require("./routes/form"));
app.use("/cart", require("./routes/cart"));
app.use("/admin", require("./routes/admin"));

app.get("/", (req, res) => {
  res.send(`Language: ${req.lang}`);

app.get("/set-lang/:lang", (req, res) => {
  res.cookie("lang", req.params.lang, { maxAge: 900000 });
  res.send("Language updated");
});
});

app.listen(3000, () => console.log("Server running on port 3000"));