import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import WhyChooseUs from '../../components/WhyChooseUs';
import PopularPackages from '../../components/PopularPackages';
import TestimonialsCarousel from '../../components/TestimonialsCarousel';
import HowItWorks from '../../components/HowItWorks';
import AboutTeam from '../../components/AboutTeam';
import FinalCTA from '../../components/FinalCTA';
import Footer from '../../components/Footer';

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
        <HeroSection />
        <WhyChooseUs />
        <PopularPackages />
        <TestimonialsCarousel />
        <HowItWorks />
        <AboutTeam />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;