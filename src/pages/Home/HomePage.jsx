import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import HeroHeader from '../../components/HeroHeader';
import ValueProposition from '../../components/ValueProposition';
import WhoWeHelp from '../../components/WhoWeHelp';
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
        {/* Hero Banner */}
        <HeroHeader />
        {/* Why Choose SettleEaze */}
        <ValueProposition />
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