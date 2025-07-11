import React from 'react';
import { FaUserGraduate, FaGlobe, FaHandshake, FaShieldAlt, FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const team = [
  {
    name: 'Aisha Patel',
    role: 'Founder',
    bio: 'Former international student, passionate about helping others settle in.',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Carlos Mendes',
    role: 'Local Manager',
    bio: 'Your go-to for all things local. Loves city tours and good coffee.',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Emily Zhang',
    role: 'Support Advisor',
    bio: 'Here to answer your questions and make you feel at home.',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const values = [
  {
    icon: <FaUserGraduate className="text-indigo-600 text-3xl mb-2" />,
    title: 'Student-Centric',
    desc: 'We prioritize student safety and convenience above all else.'
  },
  {
    icon: <FaShieldAlt className="text-indigo-600 text-3xl mb-2" />,
    title: 'Transparency',
    desc: 'Clear pricing, honest communication, no hidden fees.'
  },
  {
    icon: <FaGlobe className="text-indigo-600 text-3xl mb-2" />,
    title: 'Global Support',
    desc: 'We understand diverse needs — and speak your language.'
  },
  {
    icon: <FaHandshake className="text-indigo-600 text-3xl mb-2" />,
    title: 'Community-Driven',
    desc: 'We help you make friends and feel at home from Day 1.'
  },
];

const partners = [
  { name: 'Melbourne Uni', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Melbourne_coat_of_arms.svg' },
  { name: 'TravelSafe', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png' },
];

const AboutPage = () => (
  <div className="bg-neutral-light font-body">
    {/* Hero Banner */}
    <section className="relative h-72 flex items-center justify-center text-center bg-gradient-to-r from-indigo-500 to-blue-400">
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Banner" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow">Who We Are</h1>
        <p className="text-xl md:text-2xl text-white font-medium drop-shadow">Supporting international students every step of the way.</p>
      </div>
    </section>

    {/* Our Story / Origin */}
    <section className="container mx-auto px-4 py-12 max-w-3xl text-center">
      <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
      <p className="text-lg text-gray-700">Our journey began when a group of former international students saw how overwhelming the first days in a new country could be. We decided to build the support system we wished we had. Our goal is to make student transitions stress-free and empowering for everyone.</p>
    </section>

    {/* Mission & Vision */}
    <section className="container mx-auto px-4 py-8 max-w-4xl grid md:grid-cols-2 gap-8 text-center">
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-bold mb-2 text-indigo-700">Mission</h3>
        <p className="text-gray-700">Help students transition into a new country confidently by offering personalized, reliable arrival services.</p>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-bold mb-2 text-indigo-700">Vision</h3>
        <p className="text-gray-700">To be the leading global platform for student arrival support and integration.</p>
      </div>
    </section>

    {/* Meet the Team */}
    <section className="container mx-auto px-4 py-12 max-w-5xl">
      <h2 className="text-2xl font-semibold mb-8 text-center">Meet the Team</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {team.map(member => (
          <div key={member.name} className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-64">
            <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-indigo-100" />
            <h4 className="text-lg font-bold mb-1">{member.name}</h4>
            <span className="text-indigo-600 font-medium mb-2">{member.role}</span>
            <p className="text-gray-600 text-sm">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Core Values */}
    <section className="container mx-auto px-4 py-12 max-w-5xl">
      <h2 className="text-2xl font-semibold mb-8 text-center">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {values.map((val, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            {val.icon}
            <h4 className="font-bold text-lg mb-1">{val.title}</h4>
            <p className="text-gray-600 text-sm">{val.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Partners / Affiliations */}
    <section className="container mx-auto px-4 py-12 max-w-4xl text-center">
      <h2 className="text-2xl font-semibold mb-6">Our Partners</h2>
      <div className="flex flex-wrap justify-center items-center gap-8 mb-6">
        {partners.map(partner => (
          <div key={partner.name} className="flex flex-col items-center">
            <img src={partner.logo} alt={partner.name} className="h-16 object-contain mb-2" />
            <span className="text-gray-700 text-sm font-medium">{partner.name}</span>
          </div>
        ))}
      </div>
      <blockquote className="italic text-indigo-700 max-w-xl mx-auto">“I felt so supported from the moment I landed. The team made my transition smooth and stress-free!”<br /><span className="block mt-2 text-gray-600">— Priya, India</span></blockquote>
    </section>

    {/* CTA Section */}
    <section className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Journey?</h2>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <a href="/packages" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">Explore Our Packages</a>
        <a href="/contact" className="px-6 py-3 bg-white border border-indigo-600 text-indigo-700 rounded-lg font-medium hover:bg-indigo-50 transition">Contact Our Support Team</a>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-900 text-white py-8 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="mb-4 md:mb-0">
          <div className="font-bold text-lg mb-1">StudentArrival</div>
          <div className="text-gray-400 text-sm">Email: support@studentarrival.com</div>
          <div className="text-gray-400 text-sm">Phone/WhatsApp: +61 400 123 456</div>
          <div className="text-gray-400 text-sm">Location: Melbourne, Australia</div>
        </div>
        <div className="flex gap-4 text-2xl">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400"><FaInstagram /></a>
          <a href="https://wa.me/61400123456" target="_blank" rel="noopener noreferrer" className="hover:text-green-400"><FaWhatsapp /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  </div>
);

export default AboutPage; 