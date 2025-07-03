import React from 'react';
import Navbar from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import ServicesShowcase from '../../components/ServicesShowcase';
import ValueProposition from '../../components/ValueProposition';
import HowItWorks from '../../components/HowItWorks';
import TestimonialsCarousel from '../../components/TestimonialsCarousel';
import UniversityPartners from '../../components/UniversityPartners';
import GeoDiversityMap from '../../components/GeoDiversityMap';
import FinalCTA from '../../components/FinalCTA';
import Footer from '../../components/Footer';

const HomePage = () => {
  // Replace with real auth state
  const isAuthenticated = false;

  return (
    <div className="font-body bg-neutral-light">
      <Navbar isAuthenticated={isAuthenticated} />
      <main>
        
        <HeroSection />
        <ServicesShowcase />
        <ValueProposition />
        <HowItWorks />
        <TestimonialsCarousel />
        <UniversityPartners />
        <GeoDiversityMap />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;