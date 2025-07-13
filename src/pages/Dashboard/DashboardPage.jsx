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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [viewBooking, setViewBooking] = useState(null);
  const [cancelBooking, setCancelBooking] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [arrivalModalOpen, setArrivalModalOpen] = useState(false);
  const [arrivalDetails, setArrivalDetails] = useState({ date: '', time: '', flight: '' });
  const [arrivalForm, setArrivalForm] = useState({ date: '', time: '', flight: '' });
  const [arrivalLoading, setArrivalLoading] = useState(false);
  const [arrivalError, setArrivalError] = useState('');
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'welcome', message: 'Welcome to SettleEaze! Start your onboarding journey.', read: false },
    { id: 2, type: 'booking', message: 'Your airport pickup is scheduled for next week.', read: false },
    { id: 3, type: 'reminder', message: 'Don’t forget to upload your visa documents.', read: false },
  ]);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ old: '', new: '', confirm: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const markNotificationRead = (id) => {
    setNotifications(n => n.map(notif => notif.id === id ? { ...notif, read: true } : notif));
  };

  // Onboarding progress state (mock for now)
  const [onboardingSteps, setOnboardingSteps] = useState([
    { key: 'airport', label: 'Airport Pickup', status: 'completed' },
    { key: 'sim', label: 'SIM Card Setup', status: 'completed' },
    { key: 'accommodation', label: 'Accommodation', status: 'in_progress' },
    { key: 'bank', label: 'Bank Account', status: 'pending' },
    { key: 'healthcare', label: 'Healthcare', status: 'pending' },
    { key: 'orientation', label: 'Orientation', status: 'pending' },
    { key: 'job', label: 'Job Support', status: 'pending' },
  ]);

  const handleStepStatus = (idx, newStatus) => {
    setOnboardingSteps(steps => steps.map((s, i) => i === idx ? { ...s, status: newStatus } : s));
  };

  const completedCount = onboardingSteps.filter(s => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / onboardingSteps.length) * 100);

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

  const openEditModal = () => {
    setEditForm({ name: user.name || '', email: user.email || '' });
    setEditError('');
    setEditModalOpen(true);
  };
  const closeEditModal = () => setEditModalOpen(false);

  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleEditSubmit = async e => {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');
    try {
      const res = await api.patch('/user/me', editForm);
      setUser(res.data.user);
      toast.success('Profile updated!');
      setEditModalOpen(false);
    } catch (err) {
      setEditError(err.response?.data?.message || 'Update failed');
    } finally {
      setEditLoading(false);
    }
  };

  const handleViewBooking = (booking) => setViewBooking(booking);
  const handleCloseViewBooking = () => setViewBooking(null);
  const handleCancelBooking = (booking) => setCancelBooking(booking);
  const handleCloseCancelBooking = () => setCancelBooking(null);
  // 1. Cancel booking with real API
  const confirmCancelBooking = async () => {
    if (!cancelBooking) return;
    setCancelLoading(true);
    try {
      // Try DELETE /booking/:id
      await api.delete(`/booking/${cancelBooking._id}`);
      toast.success('Booking cancelled!');
      setCancelBooking(null);
      fetchBookings();
    } catch (err) {
      toast.error('Failed to cancel booking.');
    } finally {
      setCancelLoading(false);
    }
  };

  const openUploadModal = () => {
    setUploadError('');
    setUploadModalOpen(true);
  };
  const closeUploadModal = () => setUploadModalOpen(false);

  const handleFileChange = (e) => {
    setUploadedFiles(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadError('');
    try {
      // Mock upload logic
      await new Promise(res => setTimeout(res, 1000));
      toast.success('Documents uploaded!');
      setUploadModalOpen(false);
    } catch {
      setUploadError('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const openArrivalModal = () => {
    setArrivalForm(arrivalDetails);
    setArrivalError('');
    setArrivalModalOpen(true);
  };
  const closeArrivalModal = () => setArrivalModalOpen(false);

  const handleArrivalChange = (e) => {
    setArrivalForm({ ...arrivalForm, [e.target.name]: e.target.value });
  };

  const handleArrivalSubmit = async (e) => {
    e.preventDefault();
    setArrivalLoading(true);
    setArrivalError('');
    try {
      // Mock save logic
      await new Promise(res => setTimeout(res, 800));
      setArrivalDetails(arrivalForm);
      toast.success('Arrival details updated!');
      setArrivalModalOpen(false);
    } catch {
      setArrivalError('Failed to update.');
    } finally {
      setArrivalLoading(false);
    }
  };

  const openSupportModal = () => setSupportModalOpen(true);
  const closeSupportModal = () => setSupportModalOpen(false);

  const openPasswordModal = () => {
    setPasswordForm({ old: '', new: '', confirm: '' });
    setPasswordError('');
    setPasswordSuccess('');
    setPasswordModalOpen(true);
  };
  const closePasswordModal = () => setPasswordModalOpen(false);

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess('');
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError('Passwords do not match.');
      setPasswordLoading(false);
      return;
    }
    try {
      // Mock save logic
      await new Promise(res => setTimeout(res, 1000));
      setPasswordSuccess('Password changed successfully!');
      setTimeout(() => setPasswordModalOpen(false), 1200);
    } catch {
      setPasswordError('Failed to change password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out!');
    navigate('/');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 md:px-8">
      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
            <button onClick={closeEditModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-indigo-700">Edit Profile</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                <input type="text" name="name" value={editForm.name} onChange={handleEditChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                <input type="email" name="email" value={editForm.email} onChange={handleEditChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500" />
              </div>
              {editError && <div className="text-red-600 text-sm">{editError}</div>}
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition" disabled={editLoading}>{editLoading ? 'Saving...' : 'Save Changes'}</button>
            </form>
          </div>
        </div>
      )}
      {/* View Booking Modal */}
      {viewBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
            <button onClick={handleCloseViewBooking} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-indigo-700">Booking Details</h2>
            <div className="space-y-2 text-left">
              <div><b>Booking ID:</b> {viewBooking.bookingId}</div>
              <div><b>Package:</b> {viewBooking.packageName}</div>
              <div><b>Status:</b> {viewBooking.status}</div>
              <div><b>Payment:</b> {viewBooking.paymentStatus}</div>
              <div><b>Preferred Date:</b> {viewBooking.preferredDate ? new Date(viewBooking.preferredDate).toLocaleDateString() : '-'}</div>
              <div><b>Created:</b> {viewBooking.createdAt ? new Date(viewBooking.createdAt).toLocaleDateString() : '-'}</div>
              <div><b>Notes:</b> {viewBooking.notes || '-'}</div>
            </div>
          </div>
        </div>
      )}
      {/* Cancel Booking Modal */}
      {cancelBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
            <button onClick={handleCloseCancelBooking} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-red-700">Cancel Booking</h2>
            <p className="mb-6">Are you sure you want to cancel booking <b>{cancelBooking.bookingId}</b>?</p>
            <div className="flex gap-4">
              <button onClick={handleCloseCancelBooking} className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">No, Keep</button>
              <button onClick={confirmCancelBooking} className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition" disabled={cancelLoading}>{cancelLoading ? 'Cancelling...' : 'Yes, Cancel'}</button>
            </div>
          </div>
        </div>
      )}
      {/* Document Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
            <button onClick={closeUploadModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-indigo-700">Upload Documents</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <input type="file" multiple onChange={handleFileChange} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              {uploadedFiles.length > 0 && (
                <ul className="text-sm text-gray-700 space-y-1">
                  {uploadedFiles.map((file, i) => <li key={i}>{file.name}</li>)}
                </ul>
              )}
              {uploadError && <div className="text-red-600 text-sm">{uploadError}</div>}
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>
            </form>
          </div>
        </div>
      )}
      {/* Arrival Details Modal */}
      {arrivalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
            <button onClick={closeArrivalModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-indigo-700">Update Arrival Details</h2>
            <form onSubmit={handleArrivalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Arrival Date</label>
                <input type="date" name="date" value={arrivalForm.date} onChange={handleArrivalChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Arrival Time</label>
                <input type="time" name="time" value={arrivalForm.time} onChange={handleArrivalChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Flight Number</label>
                <input type="text" name="flight" value={arrivalForm.flight} onChange={handleArrivalChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. QF10" />
              </div>
              {arrivalError && <div className="text-red-600 text-sm">{arrivalError}</div>}
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition" disabled={arrivalLoading}>{arrivalLoading ? 'Saving...' : 'Save Details'}</button>
            </form>
          </div>
        </div>
      )}
      {/* Support Modal */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
            <button onClick={closeSupportModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-indigo-700">Contact Support</h2>
            <div className="space-y-4">
              <a href="https://wa.me/61412345678" target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-4 bg-green-100 text-green-800 rounded-lg font-semibold text-center hover:bg-green-200 transition">WhatsApp Chat</a>
              <a href="mailto:support@settleeaze.com" className="block w-full py-3 px-4 bg-blue-100 text-blue-800 rounded-lg font-semibold text-center hover:bg-blue-200 transition">Email Support</a>
            </div>
          </div>
        </div>
      )}
      {/* Change Password Modal */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
            <button onClick={closePasswordModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
            <h2 className="text-xl font-bold mb-4 text-indigo-700">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Old Password</label>
                <input type="password" name="old" value={passwordForm.old} onChange={handlePasswordChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">New Password</label>
                <input type="password" name="new" value={passwordForm.new} onChange={handlePasswordChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Confirm New Password</label>
                <input type="password" name="confirm" value={passwordForm.confirm} onChange={handlePasswordChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>
              {passwordError && <div className="text-red-600 text-sm">{passwordError}</div>}
              {passwordSuccess && <div className="text-green-600 text-sm">{passwordSuccess}</div>}
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition" disabled={passwordLoading}>{passwordLoading ? 'Saving...' : 'Change Password'}</button>
            </form>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile & Actions */}
        <div className="space-y-8">
          {/* Welcome/Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600 mb-4">
              {user.name?.[0] || 'U'}
            </div>
            <h1 className="text-2xl font-bold mb-1 text-indigo-700">Welcome, {user.name}!</h1>
            <p className="text-gray-700 mb-2">{user.email}</p>
            <button onClick={openEditModal} className="mt-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition">Edit Profile</button>
          </div>

          {/* Important Actions */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-indigo-700">Important Actions</h2>
            <div className="space-y-3">
              <button onClick={openUploadModal} className="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition">Upload Documents</button>
              <button onClick={openArrivalModal} className="w-full py-2 px-4 bg-purple-50 text-purple-700 rounded-lg font-medium hover:bg-purple-100 transition">Update Arrival Details</button>
              <button onClick={openSupportModal} className="w-full py-2 px-4 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition">Contact Support</button>
            </div>
            {/* Show summary if details exist */}
            {arrivalDetails.date && (
              <div className="mt-4 bg-purple-50 rounded-lg p-4 text-sm text-purple-900">
                <div><b>Arrival Date:</b> {arrivalDetails.date}</div>
                <div><b>Time:</b> {arrivalDetails.time}</div>
                <div><b>Flight:</b> {arrivalDetails.flight}</div>
              </div>
            )}
          </div>

          {/* Useful Links */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-indigo-700">Useful Links</h2>
            <ul className="space-y-2 text-left">
              <li><a href="/contact" className="text-blue-600 hover:underline">Contact Us</a></li>
              <li><a href="/blog" className="text-blue-600 hover:underline">Blog</a></li>
            </ul>
          </div>
        </div>

        {/* Middle Column: Bookings & Progress */}
        <div className="lg:col-span-2 space-y-8">
          {/* Notifications & Reminders */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 text-indigo-700">Notifications & Reminders</h2>
            <ul className="space-y-3">
              {notifications.length === 0 ? (
                <li className="text-gray-500">No new notifications.</li>
              ) : notifications.map(n => (
                <li key={n.id} className={`flex items-center gap-3 p-3 rounded-lg ${n.read ? 'bg-gray-50 text-gray-400' : 'bg-indigo-50 text-indigo-900'}`}>
                  <span className="text-xl">
                    {n.type === 'welcome' && '👋'}
                    {n.type === 'booking' && '✈️'}
                    {n.type === 'reminder' && '📄'}
                  </span>
                  <span className="flex-1">{n.message}</span>
                  {!n.read && (
                    <button onClick={() => markNotificationRead(n.id)} className="text-xs px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Mark as read</button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Booking Overview */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-indigo-700">Your Bookings</h2>
              <button onClick={() => navigate('/packages')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">Book New Package</button>
      </div>
        {bookingsLoading ? (
          <div className="text-center py-8">Loading bookings...</div>
        ) : bookings.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No bookings found. <button onClick={() => navigate('/packages')} className="ml-2 underline text-indigo-600">Book your first package</button></div>
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
                        <td className="px-4 py-2 flex gap-2">
                          <button onClick={() => handleViewBooking(b)} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100 text-xs">View</button>
                          <button onClick={() => handleCancelBooking(b)} className="px-2 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100 text-xs" disabled={b.status !== 'Pending'}>Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
          </div>

          {/* Onboarding Progress */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-indigo-700">Onboarding Progress</h2>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div className="bg-gradient-to-r from-green-400 to-indigo-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <ul className="space-y-3">
              {onboardingSteps.map((step) => (
                <li key={step.key} className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full inline-block ${step.status === 'completed' ? 'bg-green-500' : step.status === 'in_progress' ? 'bg-yellow-400' : 'bg-gray-300'}`}></span>
                  <span className="flex-1">{step.label}</span>
                  <span className={`text-xs font-semibold ${step.status === 'completed' ? 'text-green-600' : step.status === 'in_progress' ? 'text-yellow-600' : 'text-gray-600'}`}>{step.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-2xl shadow p-6 mt-8">
            <h2 className="text-lg font-semibold mb-4 text-indigo-700">Account Settings</h2>
            <div className="space-y-3">
              <button onClick={openPasswordModal} className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">Change Password</button>
              <button onClick={openEditModal} className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">Update Profile</button>
              <button onClick={handleLogout} className="w-full py-2 px-4 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition">Logout</button>
            </div>
          </div>
        </div>
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