import React from 'react';

const packages = [
  {
    name: 'Starter Package',
    features: ['✅ Airport Pickup', '✅ SIM Card + Activation', '✅ Essentials Bag'],
    price: 'AUD $129',
  },
  {
    name: 'Standard Package',
    features: ['✅ Airport Pickup', '✅ SIM Card', '✅ Essentials Bag', '✅ Bank Account Setup'],
    price: 'AUD $199',
  },
  {
    name: 'Premium Package',
    features: ['✅ Airport Pickup', '✅ SIM Card', '✅ Essentials Bag', '✅ Bank Account Setup', '✅ Accommodation Assistance'],
    price: 'AUD $329',
  },
];

const PopularPackages = () => (
  <section className="py-20 bg-indigo-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-indigo-700 mb-10 text-center">Our Most Popular Student Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center transform transition hover:scale-105 hover:shadow-2xl group"
          >
            <div className="text-2xl font-bold text-indigo-700 mb-4">{pkg.name}</div>
            <ul className="mb-4 text-left">
              {pkg.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2 text-lg mb-1">{f}</li>
              ))}
            </ul>
            <div className="text-lg font-semibold text-green-600 mb-6">{pkg.price}</div>
            <a
              href="/packages"
              className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold shadow hover:bg-indigo-700 transition group-hover:scale-110"
            >
              Explore More
            </a>
          </div>
        ))}
      </div>
      {/* Quick CTA after packages */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-indigo-800 mb-4">Arriving in Australia Soon?</h3>
        <p className="text-lg text-gray-700 mb-6">Let SettleEase make your transition seamless — no matter your background or profession.</p>
        <a href="/booking" className="px-8 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition">Get Started Now</a>
      </div>
    </div>
  </section>
);

export default PopularPackages; 