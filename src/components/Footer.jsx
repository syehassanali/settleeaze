import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-neutral-dark text-white py-10 mt-12">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
      {/* Quick Links */}
      <div>
        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="/packages" className="hover:underline">Packages</a></li>
          <li><a href="/services" className="hover:underline">Services</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>
      </div>
      {/* Contact Info */}
      <div>
        <h3 className="font-bold text-lg mb-4">Contact</h3>
        <ul className="space-y-2">
          <li><a href="mailto:support@settleeaze.com" className="hover:underline">support@settleeaze.com</a></li>
          <li><a href="tel:+61412345678" className="hover:underline">+61 412 345 678</a></li>
        </ul>
        <div className="flex space-x-4 mt-4">
          <a href="#" className="hover:text-blue-400"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter"></i></a>
          <a href="#" className="hover:text-pink-400"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
      {/* Service Area & Legal */}
      <div className="flex flex-col justify-between">
        <div className="mb-4">
          <span className="block font-semibold mb-2">Currently serving Melbourne, Australia</span>
        </div>
        <div className="text-sm text-gray-300 space-x-4">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Use</a>
        </div>
      </div>
    </div>
    <div className="text-center text-gray-400 text-xs mt-8">&copy; {new Date().getFullYear()} SettleEaze. All rights reserved.</div>
  </footer>
);

export default Footer;