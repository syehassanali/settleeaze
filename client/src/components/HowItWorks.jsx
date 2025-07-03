import React from 'react';
import { FaCalendarAlt, FaClipboardCheck, FaPlane, FaRegSmile } from 'react-icons/fa';
import { motion } from 'framer-motion';

const steps = [
  { icon: <FaCalendarAlt />, title: 'Book Online' },
  { icon: <FaClipboardCheck />, title: 'Confirm Details' },
  { icon: <FaPlane />, title: 'Arrive Stress-Free' },
  { icon: <FaRegSmile />, title: 'Enjoy Your Stay' }
];

const HowItWorks = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-4">Simple 4-Step Process</h2>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl text-primary mb-4">
              {step.icon}
            </div>
            <div className="font-heading font-bold text-lg text-neutral-dark">{step.title}</div>
            {i < steps.length - 1 && (
              <div className="hidden md:block w-24 h-1 bg-accent mx-4 my-2 rounded-full"></div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;