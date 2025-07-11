import React from 'react';
import { Link } from 'react-router-dom';

const FinalCTA = () => (
  <section className="py-24 text-center" style={{ background: 'linear-gradient(135deg, #1976d2, #9c27b0)' }}>
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Ready to Start Your Journey?</h2>
      <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 font-body">
        Book your arrival package today and experience a stress-free transition to your new academic life.
      </p>
      <Link to="/packages" className="inline-block px-10 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg">Get Started Now</Link>
      <Link to="/contact" className="inline-block px-10 py-4 ml-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-primary transition-colors">Contact Us</Link>
    </div>
  </section>
);

export default FinalCTA;