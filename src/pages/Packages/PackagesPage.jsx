import React, { useState, useEffect } from 'react';
import BookingForm from '../../components/forms/BookingForm';
import { useNavigate } from 'react-router-dom';

const packages = [
  {
    name: 'Basic',
    price: '$99',
    features: [
      'Airport Pickup',
      'SIM Setup',
      'City Orientation',
    ],
    cta: 'Book Now',
  },
  {
    name: 'Professional',
    price: '$199',
    features: [
      'Housing Help',
      'Healthcare Registration',
      'Local SIM + Banking',
    ],
    cta: 'Book Now',
  },
  {
    name: 'Executive',
    price: 'Get Quote',
    features: [
      'Legal Assistance',
      'Networking Events',
      'Personalized Setup Services',
    ],
    cta: 'Contact Us',
  },
];

const faqs = [
  {
    question: 'Can I upgrade my package later?',
    answer: 'Yes, you can upgrade at any time by contacting our support team.'
  },
  {
    question: 'Are there group discounts?',
    answer: 'Yes, we offer special rates for groups. Please reach out for a custom quote.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept credit/debit cards, PayPal, and bank transfers.'
  },
];

const PackagesPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('PackagesPage: userId in localStorage:', localStorage.getItem('userId'));
    console.log('PackagesPage: token in localStorage:', localStorage.getItem('token'));
  }, []);

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedPackage(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Our Packages</h1>
      <p className="mb-10 text-center text-lg text-gray-600">Discover flexible settlement packages designed for every type of mover — from students and solo professionals to families and expats. Wherever life takes you, we’re here to make your transition effortless.</p>
      {/* Packages Tiers */}
      <div className="flex flex-col md:flex-row gap-8 justify-center mb-12">
        {packages.map((pkg, idx) => (
          <div key={pkg.name} className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">{pkg.name}</h2>
            <div className="text-3xl font-bold mb-4">{pkg.price}</div>
            <ul className="mb-6 space-y-2">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
            {pkg.cta === 'Book Now' ? (
              <button
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                onClick={() => handleBookNow(pkg)}
              >
                {pkg.cta}
              </button>
            ) : pkg.cta === 'Contact Us' ? (
              <button
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                onClick={() => navigate('/contact')}
              >
                {pkg.cta}
              </button>
            ) : (
              <button className="w-full py-2 px-4 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed" disabled>{pkg.cta}</button>
            )}
          </div>
        ))}
      </div>
      {/* Booking Modal */}
      <BookingForm open={bookingOpen} onClose={handleCloseBooking} pkg={selectedPackage || {}} />
      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-lg overflow-hidden">
              <button
                className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 font-medium focus:outline-none"
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
              >
                {faq.question}
              </button>
              {openFAQ === idx && (
                <div className="px-4 py-3 bg-white text-gray-700 border-t">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesPage; 