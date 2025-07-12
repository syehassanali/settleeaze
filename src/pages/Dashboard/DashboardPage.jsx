import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import api from '../../services/api';

const BANK_DETAILS = {
  accountName: 'SettleEaze Solutions',
  accountNumber: '1234567890',
  bankName: 'Global Bank',
  ifsc: 'GBIN0001234',
  branch: 'Main Branch',
};

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Handle Google OAuth token from URL
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      toast.success('Successfully signed in with Google!');
      // Remove token from URL
      navigate('/dashboard', { replace: true });
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    api.get('/user/me')
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Session expired. Please log in again.');
        setLoading(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setTimeout(() => navigate('/login'), 1500);
      });
  }, [navigate, searchParams]);

  const fetchBookings = () => {
    if (user && user._id) {
      setBookingsLoading(true);
      api.get(`/booking/user/${user._id}`)
        .then(res => {
          setBookings(res.data.bookings || []);
        })
        .catch(() => setBookings([]))
        .finally(() => setBookingsLoading(false));
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line
  }, [user]);

  const handleShowBankModal = (booking) => {
    setSelectedBooking(booking);
    setShowBankModal(true);
  };

  const handleCloseBankModal = () => {
    setShowBankModal(false);
    setSelectedBooking(null);
  };

  const handleMarkPaid = async () => {
    if (!selectedBooking) return;
    setActionLoading(true);
    try {
      await api.patch(`/booking/${selectedBooking._id}/mark-paid`);
      handleCloseBankModal();
      fetchBookings();
    } catch (err) {
      alert('Failed to mark as paid.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center mb-8">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700">Welcome, {user.name}!</h1>
        <p className="text-gray-700 mb-2">Email: {user.email}</p>
        <p className="text-gray-500">This is your dashboard.</p>
      </div>
      <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Your Bookings</h2>
        {bookingsLoading ? (
          <div className="text-center py-8">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Preferred Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {bookings.map(b => (
                  <tr key={b._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-mono text-blue-600">{b.bookingId}</td>
                    <td className="px-4 py-2">{b.packageName}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${b.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : b.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{b.status}</span>
                    </td>
                    <td className="px-4 py-2">
                      {b.paymentStatus === 'Verified' ? (
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">Received</span>
                      ) : b.paymentStatus === 'Verification Pending' ? (
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700">Verification Pending</span>
                      ) : b.paymentStatus === 'Paid' ? (
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">Paid</span>
                      ) : (
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">Not Paid</span>
                      )}
                    </td>
                    <td className="px-4 py-2">{b.preferredDate ? new Date(b.preferredDate).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-2">{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-2">
                      {b.paymentStatus === 'Not Paid' && (
                        <button
                          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs"
                          onClick={() => handleShowBankModal(b)}
                        >
                          Bank Details
                        </button>
                      )}
                      {b.paymentStatus === 'Verification Pending' && (
                        <span className="text-xs text-yellow-700">Waiting for admin</span>
                      )}
                      {b.paymentStatus === 'Verified' && (
                        <span className="text-xs text-green-700">Payment received</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Bank Details Modal */}
      {showBankModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button onClick={handleCloseBankModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-indigo-700">Bank Details for Payment</h2>
            <div className="mb-4 text-left">
              <div><b>Account Name:</b> {BANK_DETAILS.accountName}</div>
              <div><b>Account Number:</b> {BANK_DETAILS.accountNumber}</div>
              <div><b>Bank Name:</b> {BANK_DETAILS.bankName}</div>
              <div><b>IFSC:</b> {BANK_DETAILS.ifsc}</div>
              <div><b>Branch:</b> {BANK_DETAILS.branch}</div>
            </div>
            <div className="mb-4 text-sm text-gray-600">After payment, click below to notify us.</div>
            <button
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              onClick={handleMarkPaid}
              disabled={actionLoading}
            >
              {actionLoading ? 'Processing...' : 'I have paid'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;