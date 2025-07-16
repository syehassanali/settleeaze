import React from 'react';

const GeoDiversityMap = () => (
  <section className="py-20 bg-neutral-light">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-4">We Welcome You to Melbourne, Australia</h2>
      <div className="flex justify-center my-8 relative">
        {/* Show only Melbourne on the map */}
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/88/Australia_location_map_blank.svg" alt="Australia Map" className="w-full max-w-xl mx-auto" />
        {/* Melbourne Pin Overlay */}
        <span
          className="absolute"
          style={{
            left: '56%', // approximate Melbourne position on the SVG
            top: '78%',
            transform: 'translate(-50%, -100%)',
            zIndex: 2
          }}
        >
          <span className="block w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-bounce"></span>
          <span className="block text-xs mt-1 text-blue-700 font-semibold">Melbourne</span>
        </span>
      </div>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mt-4">
        SettleEaze is launching exclusively in Melbourne. All our arrival services are tailored for your smooth landing in this vibrant city!
      </p>
    </div>
  </section>
);

export default GeoDiversityMap;