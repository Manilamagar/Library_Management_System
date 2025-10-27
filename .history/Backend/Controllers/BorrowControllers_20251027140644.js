const Borrow = require('../Models/BorrowModel');
const Book = require('../Models/BookModel');
const User = require('../Models/UserModel');

/**
 * Controllers for borrow operations
 * Requires:
 * - Sequelize models instead of Mongoose
 * - JWT authentication middleware
 * - bcrypt for password hashing
 * - Cookie-based session management
 * 
 * Note: Ensure middleware validates JWT in cookies before these operations
 * 
 * Operations:
 * - createBorrow: issue a book to a user (requires valid session)
 * - returnBook: mark a borrow as returned and compute late fee
 * - renewBorrow: extend due date (requires authenticated user)
 * - getBorrow: get one borrow by id (requires authentication)
 * - listBorrows: list borrows with optional filters
 * - deleteBorrow: remove a borrow record (admin only)
 */

const DEFAULT_LOAN_DAYS = 14;
const LATE_FEE_PER_DAY = 1; // currency units per day

async function createBorrow(req, res) {
    const t = await Borrow.sequelize.transaction();
    try {
        const { userId, bookId, days } = req.body;
        if (!userId || !bookId) {
            await t.rollback();
            return res.status(400).json({ message: 'userId and bookId are required' });
        }

        const [user, book] = await Promise.all([
            User.findByPk(userId, { transaction: t }),
            Book.findByPk(bookId, { transaction: t }),
        ]);

        if (!user || !book) {
            await t.rollback();
            return res.status(404).json({ message: 'User or Book not found' });
        }

        if ((book.availableCopies ?? 0) < 1) {
            await t.rollback();
            return res.status(409).json({ message: 'No available copies' });
        }

        const borrowDate = new Date();
        const dueDate = new Date(borrowDate);
        dueDate.setDate(dueDate.getDate() + (Number(days) || DEFAULT_LOAN_DAYS));

        const borrow = await Borrow.create({
            userId: user.id ?? user.userId ?? user.get?.('id'),
            bookId: book.id ?? book.bookId ?? book.get?.('id'),
            borrowDate,
            dueDate,
            returned: false,
            renewals: 0,
            lateFee: 0,
        }, { transaction: t });

        // decrement available copies
        book.availableCopies = (book.availableCopies ?? 0) - 1;
        await book.save({ transaction: t });

        await t.commit();

        const populated = await Borrow.findByPk(borrow.id, {
            include: [
        return res.status(201).json(populated);
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: err.message });
    }
}

async function returnBook(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { id } = req.params;
        const borrow = await Borrow.findById(id).session(session);
        if (!borrow) {
            await session.abortTransaction();
            return res.status(404).json({ message: 'Borrow record not found' });
        }
        if (borrow.returned) {
            await session.abortTransaction();
            return res.status(400).json({ message: 'Book already returned' });
        }

        const now = new Date();
        borrow.returned = true;
        borrow.returnDate = now;

        let lateFee = 0;
        if (borrow.dueDate && now > borrow.dueDate) {
            const diffMs = now - borrow.dueDate;
            const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            lateFee = diffDays * LATE_FEE_PER_DAY;
            borrow.lateFee = lateFee;
        } else {
            borrow.lateFee = 0;
        }

        await borrow.save({ session });

        const book = await Book.findById(borrow.book).session(session);
        if (book) {
            book.availableCopies = (book.availableCopies ?? 0) + 1;
            await book.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        const populated = await Borrow.findById(borrow._id).populate('user', 'name email').populate('book', 'title author');
        return res.json({ borrow: populated, lateFee });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: err.message });
    }
}

async function renewBorrow(req, res) {
    try {
        const { id } = req.params;
        const { extraDays } = req.body;
        const days = Number(extraDays) || DEFAULT_LOAN_DAYS;
        const borrow = await Borrow.findById(id);
        if (!borrow) return res.status(404).json({ message: 'Borrow record not found' });
        if (borrow.returned) return res.status(400).json({ message: 'Cannot renew a returned borrow' });

        borrow.dueDate = new Date(borrow.dueDate || new Date());
        borrow.dueDate.setDate(borrow.dueDate.getDate() + days);
        borrow.renewals = (borrow.renewals || 0) + 1;

        await borrow.save();
        const populated = await Borrow.findById(borrow._id).populate('user', 'name email').populate('book', 'title author');
        return res.json(populated);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function getBorrow(req, res) {
    try {
        const { id } = req.params;
        const borrow = await Borrow.findById(id).populate('user', 'name email').populate('book', 'title author');
        if (!borrow) return res.status(404).json({ message: 'Borrow record not found' });
        return res.json(borrow);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function listBorrows(req, res) {
    try {
        const { userId, bookId, overdue, returned, page = 1, limit = 20 } = req.query;
        const filter = {};
        if (userId) filter.user = userId;
        if (bookId) filter.book = bookId;
        if (typeof returned !== 'undefined') filter.returned = returned === 'true';
        if (overdue === 'true') filter.dueDate = { $lt: new Date() }, filter.returned = false;

        const skip = (Math.max(Number(page), 1) - 1) * Number(limit);
        const [items, total] = await Promise.all([
            Borrow.find(filter).populate('user', 'name email').populate('book', 'title author').sort({ borrowDate: -1 }).skip(skip).limit(Number(limit)),
            Borrow.countDocuments(filter),
        ]);

        return res.json({ items, total, page: Number(page), limit: Number(limit) });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function deleteBorrow(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { id } = req.params;
        const borrow = await Borrow.findById(id).session(session);
        if (!borrow) {
            await session.abortTransaction();
            return res.status(404).json({ message: 'Borrow record not found' });
        }

        // If borrow wasn't returned, put copy back
        if (!borrow.returned) {
            const book = await Book.findById(borrow.book).session(session);
            if (book) {
                book.availableCopies = (book.availableCopies ?? 0) + 1;
                await book.save({ session });
            }
        }

        await Borrow.deleteOne({ _id: id }).session(session);

        await session.commitTransaction();
        session.endSession();
        return res.status(204).send();
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createBorrow,
    returnBook,
    renewBorrow,
    getBorrow,
    listBorrows,
    deleteBorrow,
};