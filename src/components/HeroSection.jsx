import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-neutral-dark">
    <img
      src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80"
      alt="International students"
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{ filter: 'brightness(0.5) blur(1px)' }}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 z-10" />
    <div className="relative z-20 text-center px-4 max-w-2xl mx-auto">
      <motion.h1
        className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 drop-shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Your Journey Starts Here
        <span className="block text-accent">Stress-Free</span>
      </motion.h1>
      <motion.p
        className="text-2xl text-white/90 mb-10 font-body"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Comprehensive arrival services for international students, designed for a seamless transition.
      </motion.p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/services"
          className="px-8 py-4 bg-accent text-white font-bold rounded-full text-lg shadow-lg hover:bg-primary transition"
        >
          Explore Services
        </Link>
        <Link
          to="/booking"
          className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white hover:text-primary transition"
        >
          Book Now
        </Link>
      </div>
    </div>
  </section>
);

export default HeroSection;