import React from 'react';

const AboutTeam = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 flex justify-center">
        <div className="w-64 h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-lg font-semibold text-center px-4">
          [Image Collage Placeholder – Friendly airport welcome, city orientation tour, SIM card setup, housing assistance, group photo of diverse newcomers smiling with our team]
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-indigo-700 mb-6">We Know What It Takes to Start Fresh in Australia</h2>
        <p className="text-lg text-gray-700 mb-4">
          Our team includes former international students, skilled migrants, and passionate locals. Whether you're a student, healthcare professional, engineer, or hospitality worker — we understand the challenges of settling in a new place.
        </p>
        <p className="text-md text-gray-600">
          From airport greetings to practical support, we're here to make your arrival smooth, stress-free, and full of opportunity.
        </p>
      </div>
    </div>
  </section>
);

export default AboutTeam; 