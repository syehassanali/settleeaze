import React from 'react';
import { FaHeadset, FaGraduationCap, FaWallet, FaGlobeAmericas } from 'react-icons/fa';
import { motion } from 'framer-motion';

const values = [
  { icon: <FaHeadset className="text-3xl text-primary" />, title: '24/7 Support', desc: 'Help anytime, anywhere' },
  { icon: <FaGraduationCap className="text-3xl text-primary" />, title: 'Student-Focused', desc: 'By students, for students' },
  { icon: <FaWallet className="text-3xl text-primary" />, title: 'Affordable Packages', desc: 'Budget-friendly solutions' },
  { icon: <FaGlobeAmericas className="text-3xl text-primary" />, title: 'Cultural Integration', desc: 'Feel at home faster' }
];

const ValueProposition = () => (
  <section className="py-20 bg-neutral-light">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-4">Why Choose SettleEaze</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            className="bg-white p-8 rounded-xl shadow-lg text-center transition-transform hover:-translate-y-2"
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
              {v.icon}
            </div>
            <h3 className="text-xl font-bold text-neutral-dark mb-4">{v.title}</h3>
            <p className="text-neutral-dark">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueProposition;