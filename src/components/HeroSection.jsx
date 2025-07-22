import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-neutral-dark overflow-hidden">
    {/* Cityscape background */}
    <img
      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
      alt="Melbourne city skyline"
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{ filter: 'brightness(0.7)' }}
    />
    {/* Overlay image of happy arrivals */}
    <img
      src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80"
      alt="Happy new arrivals"
      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl h-64 object-cover object-bottom z-10 opacity-90 rounded-t-3xl shadow-2xl"
      style={{ borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem' }}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 to-indigo-600/60 z-20" />
    <div className="relative z-30 text-center px-4 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-screen">
      <motion.h1
        className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 drop-shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Australia with Ease
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-white/90 mb-10 font-body"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Seamless Arrival Solutions for International Students & Skilled Professionals
      </motion.p>
      <motion.p className="text-white/80 mb-10 max-w-xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
        From airport pickup to permanent settlement—our all-in-one packages are designed to make your transition stress-free.
      </motion.p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <motion.a
          href="/packages"
          className="px-8 py-4 bg-green-500 text-white font-bold rounded-full text-lg shadow-lg hover:bg-green-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
          whileHover={{ scale: 1.08 }}
        >
          Explore Packages
        </motion.a>
        <motion.a
          href="/booking"
          className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full text-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
          whileHover={{ scale: 1.08 }}
        >
          Book Your Arrival
        </motion.a>
      </div>
    </div>
  </section>
);

export default HeroSection;