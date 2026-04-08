const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username } = req.body;

  if (username === "admin") {
    req.session.user = { role: "admin" };
  } else {
    req.session.user = { role: "user" };
  }

  const guestCart = JSON.parse(req.cookies.cart || "[]");

  if (!req.session.cart) req.session.cart = [];

  req.session.cart = [...req.session.cart, ...guestCart];

  res.clearCookie("cart");

  res.send("Logged in & Cart merged");
});

module.exports = router;