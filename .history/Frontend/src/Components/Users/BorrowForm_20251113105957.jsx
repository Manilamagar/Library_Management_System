import { useState } from 'react';
import API from '../../Services/API';
import { toast } from 'react-toastify';

const BorrowForm = ({ bookId, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    setLoading(true);
    try {
      await API.post('/borrow', { bookId });
      toast.success('Book borrowed! Due in 14 days.');
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBorrow}
      disabled={loading}
      className="btn-primary text-sm"
    >
      {loading ? 'Borrowing...' : 'Borrow'}
    </button>
  );
};