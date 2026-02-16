const express = require("express");
const fs = require("fs").promises;

const app = express();
app.use(express.json());


app.use((req, res, next) => {
  console.log("I am middleware 1");
  next();
});


app.use((req, res, next) => {
  console.log("I am middleware 2");
  next();
});


const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  
  if (token !== "mysecrettoken") {
    return res.status(403).json({ msg: "Invalid token" });
  }

  console.log("Token verified");
  next();
};


const loggerFile = async (req, res, next) => {
  const log = `Request at: ${new Date().toLocaleString()} | Method: ${req.method} | URL: ${req.url}\n`;

  try {
    await fs.appendFile("log.txt", log);
    console.log("log written");
  } catch (err) {
    console.log("file error:", err);
  }

  next();
};


app.get("/students", authMiddleware, loggerFile, (req, res) => {
  res.status(200).json({ msg: "students route hit" });
});


const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server running on port 8000");
});