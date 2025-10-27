// backend/routes/borrows.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../Middleware/authMiddleware');
Mconst Book = require('../models/Book');

router.post('/', [protect, authorize('Student')], async (req, res) => {
  const { bookId } = req.body;
  const book = await Book.findByPk(bookId);
  if (book.available < 1) return res.status(400).json({ msg: 'Book not available' });

  await Borrow.create({ studentId: req.user.id, bookId });
  book.available -= 1;
  await book.save();
  res.status(201).json({ msg: 'Book borrowed' });
});

router.put('/:id/return', [protect, authorize('Librarian')], async (req, res) => {
  const borrow = await Borrow.findByPk(req.params.id);
  if (!borrow) return res.status(404).json({ msg: 'Borrow not found' });

  borrow.returnDate = new Date();
  borrow.status = 'returned';
  await borrow.save();

  const book = await Book.findByPk(borrow.bookId);
  book.available += 1;
  await book.save();
  res.json({ msg: 'Book returned' });
});

// Add get borrows for roles

module.exports = router;