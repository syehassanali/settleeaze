import React from 'react';

const partners = [
  { name: "Toronto", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/University_of_Toronto_coat_of_arms.svg" },
  { name: "Melbourne", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/University_of_Melbourne_coat_of_arms.svg" },
  { name: "Barcelona", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/University_of_Barcelona_coat_of_arms.svg" },
  // Add more as needed
];

const UniversityPartners = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-4">Partnered With Top Universities</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
        {partners.map((p, i) => (
          <div key={i} className="flex flex-col items-center group">
            <img src={p.logo} alt={p.name} className="w-20 h-20 object-contain grayscale group-hover:grayscale-0 transition duration-300" />
            <span className="mt-2 text-neutral-dark font-body">{p.name}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="/partners" className="text-primary font-bold underline hover:text-secondary">See All Partners</a>
      </div>
    </div>
  </section>
);

export default UniversityPartners;