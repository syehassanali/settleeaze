import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from 'react-icons/fa';
import 'swiper/css';

const testimonials = [
  {
    quote: "The airport pickup service was a lifesaver! After a long flight, it was such a relief to see someone waiting for me with my name sign.",
    name: "Sarah Johnson",
    university: "University",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "The temporary accommodation was perfect while I looked for an apartment. Clean, safe, and in a great location near campus.",
    name: "David Kim",
    university: "University of Melbourne",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "The city tour helped me get oriented quickly. I learned about public transport, where to shop, and made friends with other students.",
    name: "Maria Garcia",
    university: "University of Barcelona",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  }
];

const TestimonialsCarousel = () => (
  <section className="py-20 bg-neutral-light">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-4">Trusted by Students Worldwide</h2>
      </div>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000 }}
        className="max-w-3xl mx-auto"
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-accent" />
                ))}
              </div>
              <p className="text-neutral-dark mb-6 text-lg text-center">"{t.quote}"</p>
              <div className="flex items-center space-x-4">
                <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-neutral-dark">{t.name}</div>
                  <div className="flex items-center space-x-2">
                    <img src={t.logo} alt={t.university} className="w-6 h-6" />
                    <span className="text-sm text-neutral-dark">{t.university}</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default TestimonialsCarousel;