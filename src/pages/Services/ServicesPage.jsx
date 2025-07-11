import React from 'react';
import services from '../../data/servicesData';
import ServiceCard from '../../components/ServiceCard';

const ServicesPage = () => {
  return (
    <div className="container mx-auto px-4 py-10 pt-24">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(service => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;