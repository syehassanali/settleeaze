import React, { useState } from 'react';
import api from '../../services/api';

const BookingForm = ({ open, onClose, pkg }) => {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    preferredDate: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const userId = localStorage.getItem('userId');

    if (!userId || !pkg || !pkg.name) {
      setError('You must be logged in and select a valid package to book.');
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/booking', {
        userName: form.userName,
        email: form.email,
        preferredDate: form.preferredDate,
        notes: form.notes,
        packageName: pkg.name,
        packageId: pkg.name, // TEMP workaround for hardcoded packages
        bookingDate: new Date().toISOString().slice(0, 10),
        userId,
      });

      setSuccess('Booking successful!');
      setBookingId(res.data.bookingId);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
        {success ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-green-600">Thank you for booking!</h2>
            <p className="mb-4">Your Booking ID is <span className="font-mono text-blue-600">{bookingId}</span></p>
            <button onClick={onClose} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">Secure Your {pkg.name} Package – Perfect for Students, Professionals, Families & More</h2>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input type="text" name="userName" value={form.userName} onChange={handleChange} required className="w-full border rounded px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border rounded px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Preferred Date</label>
              <input type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange} required className="w-full border rounded px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Notes (optional)</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-medium">
              {loading ? 'Booking...' : 'Book Now'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingForm; 