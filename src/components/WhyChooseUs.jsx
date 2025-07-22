import React from 'react';
import { FaPlane, FaSimCard, FaBed, FaHandsHelping } from 'react-icons/fa';

const features = [
  { icon: <FaPlane />, title: 'Airport to Dorm Support', desc: 'From landing to your new home, we guide you every step.' },
  { icon: <FaSimCard />, title: 'Banking, SIM, Essentials', desc: 'Get your phone, bank, and essentials set up fast.' },
  { icon: <FaBed />, title: 'Vetted Accommodations', desc: 'Comfortable, safe, and student-friendly housing.' },
  { icon: <FaHandsHelping />, title: 'Guidance & Ongoing Help', desc: 'Pre-arrival advice and ongoing support.' },
];

const WhyChooseUs = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-indigo-700 mb-4 text-center">Why Thousands Trust SettleEase Australia</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 text-center">
        From students to skilled workers, we’ve helped countless newcomers take their first confident steps in Australia. Here's why they choose us:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl shadow hover:shadow-lg transition group bg-indigo-50">
            <div className="text-4xl mb-4 text-indigo-600 group-hover:text-blue-400 transition-colors">
              {f.icon}
            </div>
            <div className="font-bold text-lg mb-2">{f.title}</div>
            <div className="text-gray-600 text-sm">{f.desc}</div>
          </div>
        ))}
      </div>
      {/* Collage image placeholder */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-lg font-semibold text-center px-4">
          [Image Collage Placeholder – Friendly airport welcome, city orientation tour, SIM card setup, housing assistance, group photo of diverse newcomers smiling with our team]
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs; 