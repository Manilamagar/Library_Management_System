// backend/routes/books.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../Middleware/auth');
const Book = require('../Models/Book');

router.get('/', protect, async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

router.post('/', [protect, authorize('Librarian')], async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
});

// Add update/delete for Librarian

module.exports = router;