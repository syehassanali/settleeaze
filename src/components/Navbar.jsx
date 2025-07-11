import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaChevronDown } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { jwtDecode } from 'jwt-decode'; // ✅ Named import

const Navbar = ({ isAuthenticated }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navbarRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Auth state from localStorage
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const onStorage = () => {
      setUserName(localStorage.getItem('userName'));
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

let userId = null;
const localToken = localStorage.getItem('token'); // ✅ fixed name

if (localToken) {
  try {
    const decoded = jwtDecode(localToken);
    userId = decoded.id; // assign to the outer variable
    console.log('Decoded userId from token:', userId);
    localStorage.setItem('userId', userId); // ✅ Save to localStorage
  } catch (err) {
    console.error('Error decoding token:', err);
  }
}


  useEffect(() => {
    console.log('Navbar: userId in localStorage:', localStorage.getItem('userId'));
    console.log('Navbar: token in localStorage:', localStorage.getItem('token'));
    console.log('Navbar: localStorage snapshot:', { ...localStorage });
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUserName(null);
    setToken(null);
    navigate('/');
  };

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Services', path: '/services' },
    { name: 'Packages', path: '/packages' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm py-2`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold flex items-center group"
          aria-label="Go to homepage"
        >
          <span className="flex items-center bg-white bg-opacity-90 px-2 rounded shadow-sm" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.18)' }}>
            <span className="text-indigo-600 group-hover:text-indigo-700 transition-colors">Settle</span>
            <span className="text-gray-800 group-hover:text-gray-900 transition-colors">Eaze</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="font-medium text-gray-800 hover:text-indigo-700 transition-colors duration-300 relative group"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          {token && (
            <Link
              to="/dashboard"
              className="ml-6 px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 transition"
            >
              Dashboard
            </Link>
          )}
          {token ? (
            <>
              <span className="ml-4 font-semibold text-indigo-700">Welcome, {userName}</span>
              <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">Logout</button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-4 py-2 font-medium rounded-lg text-indigo-700 hover:bg-indigo-50 transition-all duration-300"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/50"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out ${
          mobileOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div 
          className={`absolute top-0 left-0 w-4/5 max-w-sm h-full bg-white/95 backdrop-blur-md border-r border-gray-200 shadow-xl transition-transform duration-500 ease-in-out ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 border-b border-gray-100">
            <Link 
              to="/" 
              className="text-2xl font-bold flex items-center"
              onClick={() => setMobileOpen(false)}
            >
              <span className="flex items-center bg-white bg-opacity-90 px-2 rounded shadow-sm" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.18)' }}>
                <span className="text-indigo-600">Settle</span>
                <span className="text-gray-800">Eaze</span>
              </span>
            </Link>
          </div>
          <nav className="flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-6 py-3 font-medium text-gray-700 hover:bg-indigo-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="px-6 py-4 border-t border-gray-100">
            {token ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center mb-3 px-4 py-3 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <span className="block mb-3 font-semibold text-indigo-700">Welcome, {userName}</span>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="w-full px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors mb-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center justify-center mb-3 px-4 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;