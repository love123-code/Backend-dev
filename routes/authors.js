const express = require("express");
const router = express.Router();

let authors = [
  { id: 1, name: "Paulo Coelho", country: "Brazil" },
  { id: 2, name: "James Clear", country: "USA" }
];


router.get("/", (req, res) => {
  res.json(authors);
});


router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const author = authors.find(a => a.id === id);

  if (!author) return res.status(404).json({ message: "Author not found" });

  res.json(author);
});


router.post("/", (req, res) => {
  const { name, country } = req.body;

  const newAuthor = {
    id: authors.length + 1,
    name,
    country
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const author = authors.find(a => a.id === id);

  if (!author) return res.status(404).json({ message: "Author not found" });

  author.name = req.body.name || author.name;
  author.country = req.body.country || author.country;

  res.json(author);
});


router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  authors = authors.filter(a => a.id !== id);
  res.json({ message: "Author deleted successfully" });
});

module.exports = router;
