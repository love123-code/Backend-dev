const express = require("express");
const router = express.Router();

const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  res.status(403).send("Forbidden");
};

router.get("/", isAdmin, (req, res) => {
  res.send("Welcome Admin Panel");
});

module.exports = router;