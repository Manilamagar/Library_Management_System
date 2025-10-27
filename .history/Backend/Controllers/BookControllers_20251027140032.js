const sequelize = require('../Config/database.js')
const Book  = require('../models/bookModels.js');

exports.createBook = async (req, res) => {
  try {
    const { title, author, totalCopies, isbn,category} = req.body;
    const book = await Book.create({ title, author, totalCopies, availableCopies: totalCopies || 1, isbn,category });
    res.status(201).json(book);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    res.json(book);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    await book.update(req.body);
    res.json(book);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    await book.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
