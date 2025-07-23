import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-start group">
      <div className="text-4xl mb-3">{service.icon || '🔧'}</div>
      <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
        <img
          src={service.imageUrl || service.image || 'https://via.placeholder.com/200x160?text=No+Image'}
          alt={service.title}
          className="w-full h-full object-cover object-center"
          style={{ minHeight: '100px', maxHeight: '160px', aspectRatio: '5/4' }}
          onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/200x160?text=No+Image'; }}
        />
      </div>
      <h3 className="text-lg font-bold mb-1 text-indigo-700">{service.title}</h3>
      <div className="text-sm text-gray-500 mb-1">{service.category}</div>
      <div className="flex items-center mb-2">
        <span className="text-yellow-500 mr-1">★</span>
        <span className="font-semibold mr-2">{service.rating}</span>
        <span className="text-gray-400">|</span>
        <span className="ml-2 text-green-600 font-semibold">{service.price}</span>
      </div>
      <p className="text-gray-600 mb-4 flex-1">{service.highlight}</p>
      <Link
        to={`/services/${service.slug}`}
        className="mt-auto px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
      >
        Learn More
      </Link>
    </div>
  );
};

export default ServiceCard; 