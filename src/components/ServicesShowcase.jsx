import React from 'react';
import { FaShuttleVan, FaHome, FaSimCard, FaFileInvoice, FaShoppingBasket, FaHeartbeat, FaBriefcase, FaBalanceScale } from 'react-icons/fa';

const services = [
  { icon: <FaShuttleVan className="text-3xl text-indigo-600" />, title: 'Airport Pickup', desc: 'Safe, reliable pickup from the airport to your new home.' },
  { icon: <FaHome className="text-3xl text-green-600" />, title: 'Accommodation', desc: 'Temporary & permanent housing options for every budget.' },
  { icon: <FaSimCard className="text-3xl text-blue-600" />, title: 'Bank & SIM Registration', desc: 'Get your bank account and SIM card set up fast.' },
  { icon: <FaFileInvoice className="text-3xl text-yellow-600" />, title: 'TFN & ABN Setup', desc: 'We help you register for tax and business numbers.' },
  { icon: <FaShoppingBasket className="text-3xl text-pink-600" />, title: 'Grocery Starter Packs', desc: 'Arrive to a stocked kitchen with our starter packs.' },
  { icon: <FaHeartbeat className="text-3xl text-red-600" />, title: 'Health Insurance', desc: 'Guidance and help with health cover for your stay.' },
  { icon: <FaBriefcase className="text-3xl text-indigo-700" />, title: 'Job Readiness & CV Help', desc: 'Get job-ready with resume help and local tips.' },
  { icon: <FaBalanceScale className="text-3xl text-gray-600" />, title: 'Legal, Visa & PR', desc: 'Expert advice on visas, PR, and legal matters.' },
];

const ServicesShowcase = () => (
  <section className="py-20 bg-indigo-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-indigo-700 mb-10 text-center">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {services.map((s, i) => (
          <div key={i} className="flex flex-col items-center bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            <div className="mb-4">{s.icon}</div>
            <div className="font-bold text-lg mb-2 text-indigo-800">{s.title}</div>
            <div className="text-gray-600 text-sm">{s.desc}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <a href="/services" className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">View All Services</a>
      </div>
    </div>
  </section>
);

export default ServicesShowcase;