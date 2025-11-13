const IssuedBook = require('../Models/Issue');
const Book2 = require('../Models/BookModel');


exports.issueBook = async (req, res) => {
try {
const { book_id, student_id, issue_date, due_date } = req.body;
// Basic check: availability
const book = await Book2.findByPk(book_id);
if (!book) return res.status(404).json({ message: 'Book not found' });
if (book.quantity <= 0) return res.status(400).json({ message: 'No copies available' });


const issued = await IssuedBook.create({ book_id, student_id, issue_date, due_date, status: 'issued' });
// decrement quantity
book.quantity = book.quantity - 1;
await book.save();
res.status(201).json(issued);
} catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};


exports.returnBook = async (req, res) => {
try {
const { issue_id, return_date } = req.body;
const issued = await IssuedBook.findByPk(issue_id);
if (!issued) return res.status(404).json({ message: 'Issue record not found' });
if (issued.status === 'returned') return res.status(400).json({ message: 'Already returned' });
issued.return_date = return_date;
issued.status = 'returned';
await issued.save();
// increment book quantity
const book = await Book2.findByPk(issued.book_id);
if (book) { book.quantity = book.quantity + 1; await book.save(); }
res.json(issued);
} catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};