import React from 'react';
import { FaGraduationCap, FaBriefcase, FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';

const audiences = [
  {
    icon: <FaGraduationCap className="text-4xl text-indigo-600" />,
    title: 'International Students',
    description: 'From admission to orientation, we help you get settled and confident in Melbourne.',
    color: 'indigo'
  },
  {
    icon: <FaBriefcase className="text-4xl text-blue-600" />,
    title: 'Skilled Workers & Professionals',
    description: 'You focus on your career; we’ll handle the rest.',
    color: 'blue'
  },
  {
    icon: <FaHome className="text-4xl text-green-600" />,
    title: 'Families & New Residents',
    description: 'Need help with multiple arrivals? No worries — we support family moves too.',
    color: 'green'
  }
];

const WhoWeHelp = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-6">👥 Who We Help</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          International Students – From admission to orientation, we help you get settled and confident in Melbourne.<br/>
          Skilled Workers & Professionals – You focus on your career; we’ll handle the rest.<br/>
          Families & New Residents – Need help with multiple arrivals? No worries — we support family moves too.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {audiences.map((audience, i) => (
          <motion.div
            key={audience.title}
            className="bg-gray-50 p-8 rounded-xl shadow-lg text-center transition-transform hover:-translate-y-2 border-l-4 border-indigo-600"
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center mb-6 shadow-md">
              {audience.icon}
            </div>
            <h3 className="text-xl font-bold text-neutral-dark mb-4">{audience.title}</h3>
            <p className="text-neutral-dark leading-relaxed">{audience.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoWeHelp; 