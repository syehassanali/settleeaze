import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1600&q=80',
];

const heroImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"; // Placeholder: airport welcome

const HeroHeader = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-screen w-full flex items-center justify-center bg-black">
      {/* Full-width Hero Image */}
      <img
        src={heroImage}
        alt="Welcome to Melbourne"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        draggable="false"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      {/* Centered Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 md:px-0 text-center">
        <h1 className="text-white font-bold text-4xl md:text-6xl mb-6 drop-shadow-lg" style={{ fontFamily: 'Montserrat, Poppins, sans-serif', textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}>
          New beginnings made easier.
        </h1>
        <h2 className="text-white text-xl md:text-2xl font-medium mb-6 max-w-2xl drop-shadow" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
          Whether you’re coming to Australia to study, work, or explore new opportunities, SettleEaze takes the stress out of settling in.<br /><br />From airport pickup and housing help to SIM card setup and local orientation — we’ve got your arrival covered, start to finish.
        </h2>
        <a
          href="/packages"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition"
        >
          Explore Packages
        </a>
      </div>
    </section>
  );
};

export default HeroHeader;
