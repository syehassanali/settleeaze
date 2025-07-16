import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1600&q=80',
];

const HeroHeader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-start px-6 md:px-16 bg-cover bg-center overflow-hidden">
      {/* Carousel Images */}
      {images.map((img, i) => (
        <div
          key={img}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${i === index ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
          style={{ backgroundImage: `url('${img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          aria-hidden={i !== index}
        />
      ))}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      {/* Content */}
      <div className="relative z-20 max-w-4xl text-left">
        <h1 className="text-white font-bold leading-tight text-4xl md:text-6xl mb-6">
          New beginnings made easier — in Australia.
        </h1>
        <h2 className="text-white text-xl md:text-2xl font-medium mb-6 max-w-2xl">
          Whether you’re coming to Australia to study, work, or explore new opportunities, SettleEaze takes the stress out of settling in.<br /><br />From airport pickup and housing help to SIM card setup and local orientation — we’ve got your arrival covered, start to finish.
        </h2>
        <Link
          to="/packages"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition"
        >
          Explore Packages
        </Link>
      </div>
    </section>
  );
};

export default HeroHeader;
