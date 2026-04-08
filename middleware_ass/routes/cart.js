const express = require("express");
const router = express.Router();

// Add item
router.post("/add", (req, res) => {
  const item = req.body;

  // Logged-in user
  if (req.session.user) {
    if (!req.session.cart) req.session.cart = [];
    req.session.cart.push(item);
    return res.send("Added to session cart");
  }

  // Guest user
  let cart = JSON.parse(req.cookies.cart || "[]");
  cart.push(item);

  res.cookie("cart", JSON.stringify(cart), { httpOnly: true });
  res.send("Added to cookie cart");
});

// View cart
router.get("/", (req, res) => {
  if (req.session.user) {
    return res.json(req.session.cart || []);
  }

  const cart = JSON.parse(req.cookies.cart || "[]");
  res.json(cart);
});

module.exports = router;