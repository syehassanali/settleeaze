import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-neutral-dark text-white pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-heading font-bold mb-6">SettleEaze</h3>
          <p className="text-gray-400 mb-4">We specialize in providing comprehensive arrival services for international students to ensure a smooth transition to their new academic life.</p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"><FaFacebookF /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"><FaTwitter /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"><FaInstagram /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"><FaLinkedinIn /></a>
          </div>
        </div>
        {/* Services */}
        <div>
          <h3 className="text-xl font-heading font-bold mb-6">Our Services</h3>
          <ul className="space-y-3">
            <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Airport Pickup</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Temporary Accommodation</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Permanent Housing Assistance</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">SIM Card Setup</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">City Orientation Tour</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Banking Assistance</Link></li>
          </ul>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-heading font-bold mb-6">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h3 className="text-xl font-heading font-bold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-gray-400">
            <li>123 University Ave, Toronto, Canada</li>
            <li>+1 (416) 555-0123</li>
            <li>info@studentarrival.com</li>
            <li>Mon-Fri: 9AM - 6PM</li>
          </ul>
          <form className="mt-4">
            <input type="email" placeholder="Your email" className="w-full px-3 py-2 rounded mb-2 text-neutral-dark" />
            <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition-colors">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} SettleEaze. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;