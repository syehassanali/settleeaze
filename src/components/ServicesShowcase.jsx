import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Airport Pickup',
    desc: 'Meet & greet at the airport, direct transfer to your accommodation.',
    price: '$49',
    img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/services/airport-pickup'
  },
  {
    title: 'Temporary Accommodation',
    desc: 'Short-term stays while you find permanent housing.',
    price: '$89/night',
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/services/temporary-accommodation'
  },
  {
    title: 'SIM Card Setup',
    desc: 'Get connected with a local SIM card and data plan.',
    price: '$25',
    img: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/services/sim-card'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 }
  })
};

const ServicesShowcase = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-4">Our Most Popular Services</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <div className="h-56 overflow-hidden">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-2">{s.title}</h3>
              <p className="text-neutral-dark mb-4">{s.desc}</p>
              <div className="text-2xl font-bold text-accent mb-4">{s.price}</div>
              <Link to={s.link} className="block w-full py-3 bg-primary text-white text-center rounded-lg font-medium hover:bg-secondary transition-colors">Learn More</Link>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/services" className="text-primary font-bold underline hover:text-secondary">View All Services</Link>
      </div>
    </div>
  </section>
);

export default ServicesShowcase;