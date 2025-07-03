import React from 'react';

const GeoDiversityMap = () => (
  <section className="py-20 bg-neutral-light">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-4">We Serve Students in 30+ Countries</h2>
      <div className="flex justify-center my-8">
        {/* Replace with a real interactive map if needed */}
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/World_map_blank_without_borders.svg" alt="World Map" className="w-full max-w-2xl mx-auto" />
        {/* You can overlay animated markers using absolute positioning or a map library */}
      </div>
    </div>
  </section>
);

export default GeoDiversityMap;