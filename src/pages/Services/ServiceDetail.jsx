import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import services from '../../data/servicesData';

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Service Not Found</h2>
        <button onClick={() => navigate('/services')} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Back to Services</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <button 
        onClick={() => navigate('/services')} 
        className="mt-8 mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 w-full max-w-xs text-left flex items-center gap-2 cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="text-lg">&larr;</span> <span className="flex-1">Back to Services</span>
      </button>
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          <div className="text-5xl mb-4">{service.icon}</div>
          <img src={service.image} alt={service.title} className="w-48 h-32 object-cover rounded-lg mb-4" />
          <div className="text-green-600 font-bold text-lg mb-2">{service.price}</div>
          <div className="text-gray-500 text-sm mb-2">{service.category}</div>
          <div className="flex items-center text-yellow-500 font-semibold mb-2">
            ★ {service.rating}
        </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">{service.title}</h2>
          <p className="text-gray-700 mb-4">{service.description}</p>
          <h3 className="text-lg font-semibold mb-2">Features:</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            {service.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
                ))}
              </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;