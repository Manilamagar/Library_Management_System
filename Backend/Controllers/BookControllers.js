import db from '../Config/db.js';
// Get all books

  export const getBooks = async (req, res) => {
    try {
      // dynamic import to work in ES module context
      const jwtModule = await import('jsonwebtoken');
      const jwt = jwtModule.default || jwtModule;

      // Get token from cookie or Authorization header
      const token =
        (req.cookies && (req.cookies.token || req.cookies.jwt)) ||
        (req.headers.authorization && req.headers.authorization.split(' ')[1]);

      if (!token) return res.status(401).json({ error: 'Authentication required' });

      // Verify token (JWT secret should be in process.env.JWT_SECRET)
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // attach payload if needed downstream
      } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }

      // Resolve Sequelize Book model from db export
      const Book = db.Book || (db.models && db.models.Book);
      if (!Book) return res.status(500).json({ error: 'Book model not found. Check Sequelize config.' });

      // Fetch all books via Sequelize
      const books = await Book.findAll();
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message || err });
    }
  };

// Borrow books
export const borrowBooks = (req, res) => {
  const { user_id, book_id, borrow_date, return_date } = req.body;
  const sql = 'INSERT INTO borrows (user_id, book_id, borrow_date, return_date) VALUES (?, ?, ?, ?)';
  db.query(sql, [user_id, book_id, borrow_date, return_date], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    // Set book as unavailable
    db.query('UPDATE books SET available = FALSE WHERE id = ?', [book_id]);
    res.json({ message: 'Book borrowed successfully', id: result.insertId });
  });
};

// Search books by title or author
export const searchBooks = (req, res) => {
  const { query } = req.query;
  const sql = 'SELECT * FROM books WHERE title LIKE ? OR author LIKE ?';
  db.query(sql, [`%${query}%`, `%${query}%`], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// View single book details
export const viewBooks = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM books WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

// Add new book
export const addBooks = (req, res) => {
  const { title, author, year, genre } = req.body;
  const sql = 'INSERT INTO books (title, author, year, genre) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, author, year, genre], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Book added successfully', id: result.insertId });
  });
};

// Update book info
export const updateBooks = (req, res) => {
  const { id } = req.params;
  const { title, author, year, genre } = req.body;
  const sql = 'UPDATE books SET title = ?, author = ?, year = ?, genre = ? WHERE id = ?';
  db.query(sql, [title, author, year, genre, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Book updated successfully' });
  });
};

// Delete book
export const deleteBooks = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM books WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Book deleted successfully' });
  });
};

// Edit (fetch book details before update)
export const editBooks = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM books WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

// Issue book (similar to borrow but for admin control)
export const issuesBooks = (req, res) => {
  const { user_id, book_id, borrow_date, return_date } = req.body;
  const sql = 'INSERT INTO borrows (user_id, book_id, borrow_date, return_date) VALUES (?, ?, ?, ?)';
  db.query(sql, [user_id, book_id, borrow_date, return_date], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    db.query('UPDATE books SET available = FALSE WHERE id = ?', [book_id]);
    res.json({ message: 'Book issued successfully', id: result.insertId });
  });
};

// Return book
export const returnBooks = (req, res) => {
  const { book_id } = req.body;
  const sql = 'UPDATE books SET available = TRUE WHERE id = ?';
  db.query(sql, [book_id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Book returned successfully' });
  });
};
