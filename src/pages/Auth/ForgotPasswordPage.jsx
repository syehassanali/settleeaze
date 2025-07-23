import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/auth/forgot-password', { email });
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold flex items-center justify-center group mb-2">
              <span className="text-indigo-600 group-hover:text-indigo-700 transition-colors">Settle</span>
              <span className="text-gray-800 group-hover:text-gray-900 transition-colors">Eaze</span>
            </div>
            <p className="text-gray-600 text-sm">Your journey to settling in starts here</p>
          </div>

          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-gray-900">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Click the link in your email to reset your password. The link will expire in 1 hour.
          </p>

          <div className="space-y-3">
            <Link 
              to="/login" 
              className="block w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
            >
              Back to Login
            </Link>
            <button 
              onClick={() => setSuccess(false)}
              className="block w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-gray-400 hover:shadow-md transition-all duration-300"
            >
              Send Another Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold flex items-center justify-center group mb-2">
            <span className="text-indigo-600 group-hover:text-indigo-700 transition-colors">Settle</span>
            <span className="text-gray-800 group-hover:text-gray-900 transition-colors">Eaze</span>
          </div>
          <p className="text-gray-600 text-sm">Your journey to settling in starts here</p>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 text-center">Forgot Password?</h2>
        <p className="text-gray-600 mb-6 text-center">
          No worries! Enter your email and we'll send you reset instructions.
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <span className="text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium transition-colors">
              Back to Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 