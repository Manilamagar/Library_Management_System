const IssuedBook = require('../models/IssueModel');
const Book2 = require('../Models/BookModel');


exports.issue = async (req, res) => {
try {
const { book_id, student_id, issue_date, due_date } = req.body;
// Basic check: availability
const book = await Book2.findByPk(book_id);
if (!book) return res.status(404).json({ message: 'Book not found' });
if (book.quantity <= 0) return res.status(400).json({ message: 'No copies available' });


const issue = await Issue.create({ book_id, student_id, issue_date, due_date, status: 'issued' });
// decrement quantity
book.quantity = book.quantity - 1;
await book.save();
res.status(201).json(issue);
} catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};


exports.returnBook = async (req, res) => {
try {
const { issue_id, return_date } = req.body;
const issue = await IssuedBook.findByPk(issue_id);
if (!issue) return res.status(404).json({ message: 'Issue record not found' });
if (issue.status === 'returned') return res.status(400).json({ message: 'Already returned' });
issue.return_date = return_date;
issue.status = 'returned';
await issue.save();
// increment book quantity
const book = await Book2.findByPk(issue.book_id);
if (book) { book.quantity = book.quantity + 1; await book.save(); }
res.json(issue);
} catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};