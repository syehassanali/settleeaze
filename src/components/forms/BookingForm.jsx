import React, { useState } from 'react';
import { FaCheck, FaTimes, FaCalendar, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ open, onClose, pkg }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: '',
    email: '',
    phone: '',
    preferredDate: '',
    arrivalTime: '',
    flightNumber: '',
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
        phone: form.phone,
        preferredDate: form.preferredDate,
        arrivalTime: form.arrivalTime,
        flightNumber: form.flightNumber,
        notes: form.notes,
        packageName: pkg.name,
        packageId: pkg.name,
        bookingDate: new Date().toISOString().slice(0, 10),
        userId,
        totalPrice: pkg.totalPrice || pkg.price,
      });

      setSuccess('Booking successful!');
      setBookingId(res.data.bookingId);
      setTimeout(() => {
        onClose && onClose();
        navigate('/dashboard');
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed.');
    } finally {
      setLoading(false);
    }
  };

  const renderPackageDetails = () => {
    if (!pkg) return null;

    if (pkg.services) {
      // Custom package
      return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📦</span>
            Custom Package - ${pkg.totalPrice}
          </h3>
          <div className="space-y-3">
            {pkg.services.map((service, index) => (
              <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                <div>
                  <p className="font-semibold text-gray-800">{service.serviceName}</p>
                  <p className="text-sm text-gray-600">{service.optionName}</p>
                </div>
                <span className="font-bold text-indigo-600">${service.price}</span>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Predefined package
      return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📦</span>
            {pkg.name} Package - {pkg.price}
          </h3>
          <div className="space-y-2">
            {pkg.features && pkg.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                {feature.included ? (
                  <FaCheck className="w-4 h-4 text-green-500 mr-3" />
                ) : (
                  <FaTimes className="w-4 h-4 text-gray-400 mr-3" />
                )}
                <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Complete Your Booking</h2>
              <p className="text-indigo-100 mt-1">Secure your arrival package with confidence</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-4">Thank you for choosing SettleEaze. We'll be in touch soon!</p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">Booking ID:</p>
                <p className="font-mono text-lg font-bold text-indigo-600">{bookingId}</p>
              </div>
              <button 
                onClick={onClose}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Package Details */}
              {renderPackageDetails()}

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaUser className="w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    name="userName" 
                    value={form.userName} 
                    onChange={handleChange} 
                    required 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaEnvelope className="w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    required 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaPhone className="w-4 h-4 mr-2" />
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    required 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                    placeholder="+61 400 123 456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaCalendar className="w-4 h-4 mr-2" />
                    Arrival Date
                  </label>
                  <input 
                    type="date" 
                    name="preferredDate" 
                    value={form.preferredDate} 
                    onChange={handleChange} 
                    required 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  />
                </div>
              </div>

              {/* Flight Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Arrival Time
                  </label>
                  <input 
                    type="time" 
                    name="arrivalTime" 
                    value={form.arrivalTime} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Flight Number (Optional)
                  </label>
                  <input 
                    type="text" 
                    name="flightNumber" 
                    value={form.flightNumber} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                    placeholder="QF123"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea 
                  name="notes" 
                  value={form.notes} 
                  onChange={handleChange} 
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  placeholder="Any special requirements or additional information..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Confirm Booking'
                )}
              </button>

              {/* Security Note */}
              <p className="text-xs text-gray-500 text-center">
                🔒 Your information is secure and will only be used for booking purposes
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm; 