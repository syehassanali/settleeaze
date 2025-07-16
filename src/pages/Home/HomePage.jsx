import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import HeroHeader from '../../components/HeroHeader';
import ValueProposition from '../../components/ValueProposition';
import WhoWeHelp from '../../components/WhoWeHelp';
import FinalCTA from '../../components/FinalCTA';
import Footer from '../../components/Footer';
import ServiceCard from '../../components/ServiceCard';
import services from '../../data/servicesData';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Handle Google OAuth token from URL
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      toast.success('Successfully signed in with Google!');
      // Remove token from URL
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate]);

  // Replace with real auth state
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="font-body bg-neutral-light">
      <Navbar isAuthenticated={isAuthenticated} />
      <main>
        {/* Hero Banner */}
        <HeroHeader />
        {/* Why Choose SettleEaze */}
        <ValueProposition />
        {/* Services Preview Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-10 text-center">Our Key Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map(service => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <a href="/services" className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">View All Services</a>
            </div>
          </div>
        </section>
        {/* Packages Teaser Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-6">Flexible Packages for Every Type of Mover</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">We offer packages tailored for students, workers, and families starting in Melbourne. Choose from Basic, Standard, or Premium to match your journey.</p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <span className="px-6 py-3 bg-white rounded-xl shadow font-semibold text-indigo-700 text-lg">Basic</span>
              <span className="px-6 py-3 bg-white rounded-xl shadow font-semibold text-indigo-700 text-lg">Standard</span>
              <span className="px-6 py-3 bg-white rounded-xl shadow font-semibold text-indigo-700 text-lg">Premium</span>
            </div>
            <a href="/packages" className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">View All Packages</a>
          </div>
        </section>
        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-10 text-center">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">🌟</div>
                <p className="text-lg text-gray-700 mb-4">“SettleEaze made my move to Melbourne so much easier. The airport pickup and SIM setup were a lifesaver!”</p>
                <div className="font-semibold text-indigo-700">Amit, International Student</div>
              </div>
              <div className="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">🌟</div>
                <p className="text-lg text-gray-700 mb-4">“I was nervous about finding housing, but SettleEaze helped me every step of the way. Highly recommend!”</p>
                <div className="font-semibold text-indigo-700">Priya, Skilled Worker</div>
              </div>
              <div className="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">🌟</div>
                <p className="text-lg text-gray-700 mb-4">“Our family’s arrival was smooth and stress-free. The team was always available for questions.”</p>
                <div className="font-semibold text-indigo-700">The Zhang Family</div>
              </div>
            </div>
          </div>
        </section>
        {/* Who We Help */}
        <WhoWeHelp />
        {/* CTA Banner */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;