// BorrowHistory.jsx
const history = await API.get('/borrow/my');
{history.map(b => (
  <tr>
    <td>{b.book.title}</td>
    <td>{new Date(b.borrowDate).toLocaleDateString()}</td>
    <td>{b.returnDate ? 'Returned' : 'Borrowed'}</td>
    <td className="text-red-600">
      {b.fine > 0 ? `₹${b.fine}` : '-'}
    </td>
  </tr>
))}