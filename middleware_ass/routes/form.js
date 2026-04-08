const express = require("express");
const router = express.Router();

router.post("/step1", (req, res) => {
  req.session.form = { ...req.session.form, name: req.body.name };
  res.send("Step 1 saved");
});

router.post("/step2", (req, res) => {
  req.session.form = { ...req.session.form, email: req.body.email };
  res.send("Step 2 saved");
});

router.post("/step3", (req, res) => {
  req.session.form = { ...req.session.form, password: req.body.password };
  res.send("Step 3 saved");
});

router.get("/summary", (req, res) => {
  res.json(req.session.form);
});

module.exports = router;