import React from 'react';
import { FaBoxOpen, FaPlaneArrival, FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <FaBoxOpen className="text-3xl text-indigo-600" />, 
    title: 'Choose Your Package',
    desc: 'Select the services you need before you arrive.'
  },
  {
    icon: <FaPlaneArrival className="text-3xl text-green-600" />,
    title: 'Arrival & Pickup',
    desc: 'Our team greets you at the airport and guides you through your new home.'
  },
  {
    icon: <FaHome className="text-3xl text-blue-600" />,
    title: 'Complete Settlement Support',
    desc: 'From banking to housing, we take care of everything so you can focus on your goals.'
  },
];

const HowItWorks = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-indigo-700 mb-4">How Our Service Works</h2>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="flex flex-col items-center bg-indigo-50 rounded-xl p-8 shadow hover:shadow-lg transition w-full max-w-xs"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="mb-4">{step.icon}</div>
            <div className="font-heading font-bold text-lg text-indigo-800 mb-2">{step.title}</div>
            <div className="text-gray-600 text-md text-center">{step.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;