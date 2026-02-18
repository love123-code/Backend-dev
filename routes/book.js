const express = require("express");
const router = express.Router();
const validateYear = require(".../middleware/validateYear");


let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
  { id: 2, title: "Atomic Habits", author: "James Clear", year: 2018 },
  { id: 3, title: "Wings of Fire", author: "A.P.J Abdul Kalam", year: 1999 }
];


router.get("/", (req, res) => {
  let { author, year, page = 1, limit = 10, search } = req.query;

  let result = [...books];


  if (author) {
    result = result.filter(b =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

 
  if (year) {
    result = result.filter(b => b.year == parseInt(year));
  }

  
  if (search) {
    result = result.filter(b =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );
  }

 
  page = parseInt(page);
  limit = parseInt(limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedResult = result.slice(startIndex, endIndex);

  res.json({
    total: result.length,
    page,
    limit,
    data: paginatedResult
  });
});


router.post("/", validateYear, (req, res) => {
  const { title, author, year } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    author,
    year
  };

  books.push(newBook);
  res.status(201).json(newBook);
});


router.put("/:id", validateYear, (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  book.year = req.body.year || book.year;

  res.json(book);
});


router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: "Book deleted successfully" });
});

module.exports = router;
