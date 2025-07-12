import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const GoogleAuthHandler = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Store the token
      localStorage.setItem('token', token);
      
      // Decode the token to get user info (optional)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.id) {
          // You could fetch user details here if needed
          localStorage.setItem('userId', payload.id);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
      
      // Show success message
      toast.success('Successfully signed in with Google!');
      
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      // No token found, redirect to login
      toast.error('Google sign-in failed. Please try again.');
      navigate('/login');
    }
  }, [searchParams, navigate]);

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

        {/* Loading Icon */}
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-900">Completing Sign In</h2>
        <p className="text-gray-600">
          Please wait while we complete your Google sign-in...
        </p>
      </div>
    </div>
  );
};

export default GoogleAuthHandler; 