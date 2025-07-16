import React from 'react';
import { FaClock, FaUserFriends, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const values = [
  { 
    icon: <FaClock className="text-3xl text-primary" />, 
    title: 'Support That Doesn’t Sleep', 
    desc: 'Our team is here 24/7. Day or night, questions or emergencies — we’ve got your back.' 
  },
  { 
    icon: <FaUserFriends className="text-3xl text-primary" />, 
    title: 'We’ve Been There', 
    desc: 'Built by people who’ve experienced the same move — we understand every challenge.' 
  },
  { 
    icon: <FaUsers className="text-3xl text-primary" />, 
    title: 'For Everyone', 
    desc: 'Students. Workers. Professionals. Families. We tailor services to fit your journey, not just your visa.' 
  }
];

const ValueProposition = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-6">Why Choose SettleEaze</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            className="bg-white p-8 rounded-xl shadow-lg text-center flex flex-col items-center transition-transform hover:-translate-y-2"
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 text-4xl">
              {v.icon}
            </div>
            <h3 className="text-xl font-bold text-neutral-dark mb-4">{v.title}</h3>
            <p className="text-neutral-dark leading-relaxed text-base">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueProposition;