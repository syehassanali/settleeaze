import React, { useState, useEffect } from 'react';
import BookingForm from '../../components/forms/BookingForm';
import CustomPackageBuilder from '../../components/CustomPackageBuilder';
import PricingCard from '../../components/PricingCard';
import { useNavigate } from 'react-router-dom';

const packages = [
  {
    name: 'Basic',
    price: '$75',
    features: [
      { name: 'Airport Pickup (Standard)', included: true },
      { name: 'Local SIM Card Setup', included: true },
      { name: 'Accommodation Assistance', included: true },
      { name: 'Bank Account & TFN Setup', included: false },
      { name: 'Orientation Tour (City & Uni)', included: false },
      { name: 'Healthcare Registration Support', included: false },
      { name: 'Driving & Vehicle Starter Guidance', included: false },
      { name: 'Part-Time Job & Resume Support', included: false },
    ],
    isPopular: false,
    totalPrice: 75 // Airport Standard ($25) + SIM Basic ($15) + Accommodation 2-Star ($35)
  },
  {
    name: 'Standard',
    price: '$180',
    features: [
      { name: 'Airport Pickup (Standard)', included: true },
      { name: 'Local SIM Card Setup', included: true },
      { name: 'Accommodation Assistance', included: true },
      { name: 'Bank Account & TFN Setup', included: true },
      { name: 'Orientation Tour (City & Uni)', included: true },
      { name: 'Healthcare Registration Support', included: true },
      { name: 'Driving & Vehicle Starter Guidance', included: false },
      { name: 'Part-Time Job & Resume Support', included: false },
    ],
    isPopular: true,
    totalPrice: 180 // Airport Standard ($25) + SIM Standard ($25) + Accommodation 3-Star ($55) + Bank Standard ($35) + Orientation Standard ($40)
  },
  {
    name: 'Premium',
    price: '$385',
    features: [
      { name: 'Airport Pickup (Standard)', included: true },
      { name: 'Local SIM Card Setup', included: true },
      { name: 'Accommodation Assistance', included: true },
      { name: 'Bank Account & TFN Setup', included: true },
      { name: 'Orientation Tour (City & Uni)', included: true },
      { name: 'Healthcare Registration Support', included: true },
      { name: 'Driving & Vehicle Starter Guidance', included: true },
      { name: 'Part-Time Job & Resume Support', included: true },
    ],
    isPopular: false,
    totalPrice: 385 // Airport Standard ($25) + SIM Premium ($40) + Accommodation 4-Star ($85) + Bank Premium ($55) + Orientation Premium ($65) + Healthcare Premium ($55) + Driving Licence Only ($40) + Job Support Basic ($30)
  },
  {
    name: 'Custom Package',
    price: 'Get Quote',
    features: [
      { name: 'Mix & match services', included: true },
      { name: 'Personalized support', included: true },
      { name: 'Flexible scheduling', included: true },
      { name: 'Priority assistance', included: true },
      { name: 'Extended support period', included: true },
      { name: 'Family/group discounts', included: true },
      { name: 'Additional services available', included: true },
      { name: 'Tailored to your needs', included: true },
    ],
    isPopular: false,
    isCustom: true
  }
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
  {
    question: 'How long does each service take?',
    answer: 'Most services are completed within 24-48 hours of arrival. Custom packages may have different timelines.'
  },
  {
    question: 'Can I customize a package?',
    answer: 'Absolutely! Our Custom Package option allows you to mix and match services based on your specific needs.'
  }
];

const PackagesPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [customBuilderOpen, setCustomBuilderOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('PackagesPage: userId in localStorage:', localStorage.getItem('userId'));
    console.log('PackagesPage: token in localStorage:', localStorage.getItem('token'));
  }, []);

  const handleBookNow = (pkg) => {
    if (pkg.isCustom) {
      setCustomBuilderOpen(true);
    } else {
      setSelectedPackage(pkg);
      setBookingOpen(true);
    }
  };

  const handleBookCustom = (customPackage) => {
    setCustomBuilderOpen(false);
    setSelectedPackage(customPackage);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedPackage(null);
  };

  const handleCloseCustomBuilder = () => {
    setCustomBuilderOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Perfect Package
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover flexible settlement packages designed for every type of mover — from students and solo professionals to families and expats. Wherever life takes you, we're here to make your transition effortless.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {packages.map((pkg, idx) => (
            <PricingCard
              key={pkg.name}
              name={pkg.name}
              price={pkg.price}
              features={pkg.features}
              isPopular={pkg.isPopular}
              isCustom={pkg.isCustom}
              totalPrice={pkg.totalPrice}
              onBookNow={handleBookNow}
            />
          ))}
        </div>

        {/* Value Proposition */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
            Why Choose SettleEaze Packages?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 text-xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Fast & Efficient</h3>
              <p className="text-gray-600 text-sm">Get everything set up within 24-48 hours of arrival</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 text-xl">🛡️</span>
              </div>
              <h3 className="font-semibold mb-2">Safe & Reliable</h3>
              <p className="text-gray-600 text-sm">Verified services and trusted partners only</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 text-xl">💬</span>
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Help whenever you need it, day or night</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 font-medium focus:outline-none transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                >
                  {faq.question}
                </button>
                {openFAQ === idx && (
                  <div className="px-6 py-4 bg-white text-gray-700 border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingForm open={bookingOpen} onClose={handleCloseBooking} pkg={selectedPackage || {}} />
      
      {/* Custom Package Builder */}
      <CustomPackageBuilder 
        open={customBuilderOpen} 
        onClose={handleCloseCustomBuilder} 
        onBookCustom={handleBookCustom}
      />
    </div>
  );
};

export default PackagesPage; 