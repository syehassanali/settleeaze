import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import HeroHeader from '../../components/HeroHeader';
import ServicesShowcase from '../../components/ServicesShowcase';
import ValueProposition from '../../components/ValueProposition';
import HowItWorks from '../../components/HowItWorks';
import UniversityPartners from '../../components/UniversityPartners';
import GeoDiversityMap from '../../components/GeoDiversityMap';
import FinalCTA from '../../components/FinalCTA';
import Footer from '../../components/Footer';
import services from '../../data/servicesData';
import ServiceCard from '../../components/ServiceCard';
import { Link } from 'react-router-dom';

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
        {/* Quick Intro */}
        <section className="py-6 text-center bg-white">
          <div className="container mx-auto px-4">
            <p className="text-xl md:text-2xl text-neutral-dark font-medium max-w-2xl mx-auto">
              SettleEaze helps international students arrive confidently and settle easily with trusted, all-in-one arrival services.
            </p>
          </div>
        </section>
        {/* Why Choose Us */}
        <ValueProposition />
        {/* Featured Services Preview */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-indigo-700">Featured Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              {services.slice(0, 3).map(service => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
            <div className="text-center">
              <Link to="/services" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition">
                View All Services
              </Link>
            </div>
          </div>
        </section>
        {/* CTA Banner */}
        <FinalCTA />
        {/* About Us Teaser */}
        <section className="py-12 bg-white text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-dark">About SettleEaze</h2>
            <p className="text-lg text-gray-700 mb-6">
              Founded by former international students, SettleEaze is dedicated to making your transition abroad smooth, safe, and stress-free. Discover our story and mission.
            </p>
            <a href="/about" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition">Learn More</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;