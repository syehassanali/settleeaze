import React, { useEffect, useState } from 'react';
import ServiceCard from '../../components/ServiceCard';

const API_URL = '/api/admin/services/public';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setServices(data.services || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load services');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 pt-24">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">Our Services</h1>
      {loading ? (
        <div className="text-center text-indigo-600 font-semibold py-8">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold py-8">{error}</div>
      ) : services.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No services found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;